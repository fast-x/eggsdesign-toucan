import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import LanguageContext from '../../contexts/LanguageContext';
import { shiftArrayItems } from '../../helpers';
import Employee from '../../types/Employee';
import { Button } from '../input/Button';
import { EmployeePDF } from '../pdf/EmployeePDF';
import PDFExportButton from '../pdf/PDFExportButton';
import { colors } from '../styles';
import { Heading3, Paragraph } from '../Typography';
import { Modal } from './Modal';
import { z } from 'zod';
import useTranslation from '../../utils/i18n/useTranslation';
import { usePDF } from '@react-pdf/renderer';
import PDFPreview from '../pdf/PDFPreview';
import { ProjectContribution } from '../../types/Project';

interface Props {
  employee: Employee;
  closeModal: () => void;
}

const zSortedProject = z.object({
  projectId: z.string(),
  visible: z.boolean(),
});

const zStoredConfiguration = z.object({
  name: z.string(),
  projects: z.array(zSortedProject),
});

type SortedProject = z.infer<typeof zSortedProject>;
type StoredConfiguration = z.infer<typeof zStoredConfiguration>;

const labels = {
  cvVariant: {
    en: 'CV variants',
    nb: 'CV varianter',
  },
  cvVariantExperimental: {
    en: 'Experimental feature – does not save across devices, only locally for now.',
    nb: 'Eksperimentell funksjon – lagrer ikke på tvers av enheter, kun lokalt foreløpig.',
  },
  exportToPdf: {
    en: 'Export to PDF',
    nb: 'Eksporter til PDF',
  },
  cvVariantName: {
    en: 'CV Variant Name',
    nb: 'CV Variant Navn',
  },
  save: {
    en: 'Save',
    nb: 'Lagre',
  },
  remove: {
    en: 'Remove',
    nb: 'Fjern',
  },
  hide: {
    en: 'Hide',
    nb: 'Gjem',
  },
  show: {
    en: 'Show',
    nb: 'Vis',
  },
  includedProjects: {
    en: 'Included projects',
    nb: 'Inkluderte prosjekter',
  },
  reorderProjects: {
    en: 'Reorder with drag and drop. Hidden projects go to the bottom of the list.',
    nb: 'Omorganiser med dra og slipp. Skjulte prosjekter går til bunnen av listen.',
  },
};

export const ModalExportCV: React.FC<Props> = ({ employee, closeModal }) => {
  const { localeString } = useTranslation();
  const { currentLanguage } = useContext(LanguageContext);
  const { projects } = employee;
  const [sortedProjects, setSortedProjects] = React.useState<SortedProject[]>([]);
  const [storedConfigurations, setStoredConfigurations] = React.useState<StoredConfiguration[]>([]);
  const [newConfigName, setNewConfigName] = React.useState<string>('');
  const [draggedElementIndex, setDraggedElementIndex] = React.useState<number | null>(null);

  const CONFIGS_IDENTIFIER = `Stored CV configs ${employee?._id ?? ''}`;

  React.useEffect(() => {
    setSortedProjects(projects?.map((project) => ({ projectId: project?._id ?? '', visible: true })) ?? []);
  }, [projects]);

  React.useEffect(() => {
    if (storedConfigurations?.length > 0) {
      localStorage.setItem(CONFIGS_IDENTIFIER, JSON.stringify(storedConfigurations));
    }
  }, [storedConfigurations, CONFIGS_IDENTIFIER]);

  React.useEffect(() => {
    const localStorageConfig = localStorage.getItem(CONFIGS_IDENTIFIER);

    try {
      setStoredConfigurations(z.array(zStoredConfiguration).parse(JSON.parse(localStorageConfig ?? '')));
    } catch (e) {
      console.log('Unable to read stored configuration', e);
    }
  }, [CONFIGS_IDENTIFIER]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedElementIndex(index);
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.dropEffect = 'none';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    if (draggedElementIndex === null || draggedElementIndex === targetIndex) return;
    shiftOrderedList(draggedElementIndex, targetIndex);
  };

  const shiftOrderedList = (fromIdx: number, toIdx: number) => {
    const newOrderedList = shiftArrayItems(sortedProjects, fromIdx, toIdx);
    setSortedProjects(newOrderedList);
    setDraggedElementIndex(null);
  };

  const toggleSortedProject = (idx: number, show: boolean) => {
    const updatedProjectItem = { ...sortedProjects[idx], visible: !sortedProjects[idx].visible };
    const lastVisibleItemIndex = sortedProjects.findIndex((item) => !item.visible);

    if (show) {
      setSortedProjects([
        ...sortedProjects.slice(0, lastVisibleItemIndex),
        updatedProjectItem,
        ...sortedProjects.slice(lastVisibleItemIndex, idx),
        ...sortedProjects.slice(idx + 1),
      ]);
    } else {
      setSortedProjects([...sortedProjects.slice(0, idx), ...sortedProjects.slice(idx + 1), updatedProjectItem]);
    }
  };

  const saveConfiguredCV = () => {
    if (newConfigName !== '') {
      setStoredConfigurations([
        { name: newConfigName, projects: sortedProjects },
        ...storedConfigurations.filter((c) => c.name !== newConfigName),
      ]);
    }
  };

  const removeConfiguredCV = (name: string) => {
    if (name !== '') {
      setStoredConfigurations([...storedConfigurations.filter((sc) => sc.name !== name)]);
    }
  };

  const filename = `${employee?.firstName ?? ''} ${employee?.lastName ?? ''} CV`;
  const hasMatchingStoredConfiguration = storedConfigurations.filter((sc) => sc.name === newConfigName).length > 0;

  const sortedProjectsToRender = sortedProjects
    .filter((sp) => sp.visible)
    .flatMap<ProjectContribution>((sp) => {
      const project = projects?.find((p) => p?._id === sp.projectId);
      if (!project) {
        return [];
      }
      return project;
    });

  const employeeToRender: Employee = {
    ...employee,
    projects: sortedProjectsToRender,
  };
  const employeePDF = <EmployeePDF fileName={'filename'} employee={employeeToRender} lang={currentLanguage} />;

  const [pdfInstance, update] = usePDF({ document: employeePDF });
  useEffect(() => {
    update();
  });

  const exportButton = (
    <ExportButtonContainer>
      <PDFExportButton
        fileName={filename}
        pdfUrl={pdfInstance.url}
        isLoading={pdfInstance.loading}
        isError={pdfInstance.error}
      />
    </ExportButtonContainer>
  );

  return (
    <Modal handleClose={closeModal} headline={localeString(labels.exportToPdf)} footerContent={exportButton}>
      <PDFPreview blob={pdfInstance.blob} withNav />

      <ListTitle>{localeString(labels.cvVariant)}</ListTitle>
      <ListHelptext>{localeString(labels.cvVariantExperimental)}</ListHelptext>

      <SavedCVConfigs>
        <div className="saved-configs-container">
          {storedConfigurations.map((sc) => (
            <Button
              key={sc.name}
              variant="secondary"
              size="compact"
              onClick={() => {
                setNewConfigName(sc.name);
                setSortedProjects(sc.projects);
              }}>
              {sc.name}
            </Button>
          ))}
        </div>

        <div className="input-container">
          <input
            placeholder={localeString(labels.cvVariantName)}
            type="text"
            value={newConfigName}
            onChange={(e) => setNewConfigName(e.target.value)}></input>
          <Button variant="secondary" size="compact" disabled={newConfigName === ''} onClick={saveConfiguredCV}>
            {localeString(labels.save)}
          </Button>
          <Button
            variant="secondary"
            size="compact"
            disabled={!hasMatchingStoredConfiguration}
            onClick={() => removeConfiguredCV(newConfigName)}>
            {localeString(labels.remove)}
          </Button>
        </div>
      </SavedCVConfigs>

      <HorizontalLine />

      <ListTitle>{localeString(labels.includedProjects)}</ListTitle>
      <ListHelptext>{localeString(labels.reorderProjects)}</ListHelptext>

      <ProjectList>
        {sortedProjects?.map(({ projectId, visible }, i) => {
          const project = projects?.find((p) => p?._id === projectId);
          if (!project) return;
          return (
            <ProjectListItem
              draggable={visible}
              className={!visible ? 'hidden' : ''}
              key={project._id}
              onDragStart={(e) => handleDragStart(e, i)}
              onDragEnd={() => setDraggedElementIndex(null)}
              onDrop={(e) => handleDrop(e, i)}
              onDragOver={(e) => handleDragOver(e)}>
              <div className="list-item-content">
                <div className="image-container">
                  {!!project.images?.[0]?.url && <img src={project.images[0].url + '?h=160'} alt="" />}
                </div>
                <strong className="client-tag">{project.client?.name}</strong>
                {localeString(project.title)}
              </div>

              <ListItemButton onClick={() => toggleSortedProject(i, !visible)} className={!visible ? 'hidden' : ''}>
                {visible ? localeString(labels.hide) : localeString(labels.show)}
              </ListItemButton>
            </ProjectListItem>
          );
        })}
      </ProjectList>
    </Modal>
  );
};

const ListTitle = styled(Heading3)`
  margin: 0;
`;

const ListHelptext = styled(Paragraph)`
  color: ${colors.neutral2};
  font-size: 0.8rem;
`;

const ProjectList = styled.ol`
  padding: 0;
  margin: 8px 0;
`;

const ProjectListItem = styled.ol`
  padding: 8px;
  margin: 2px 0;
  font-size: 0.8rem;
  border: 1px solid ${colors.neutral2}44;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
  border-radius: 2px;
  background: white;
  transition: all 0.1s ease-in-out;

  &:hover {
    cursor: grab;
    background: ${colors.neutral2}11;
  }

  &.hidden {
    margin-top: 16px;
    opacity: 0.8;
    color: ${colors.neutral2};
    background: ${colors.neutral2}22;

    .list-item-content {
      text-decoration: line-through;
    }
  }

  &.hidden ~ &.hidden {
    margin-top: unset;
  }

  .list-item-content {
    display: flex;
    align-items: center;
  }

  .client-tag {
    margin-right: 8px;
  }

  .image-container {
    height: 32px;
    width: 48px;
    overflow: hidden;
    object-fit: cover;
    object-position: center;
    margin-right: 8px;
    background-color: ${colors.neutral3}33;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const ListItemButton = styled.button`
  &.hidden {
    opacity: 0.8;
  }

  min-width: 50px;
`;

const HorizontalLine = styled.hr`
  border: none;
  border-top: 1px solid ${colors.neutral3};
  margin: 16px 0;
`;

const SavedCVConfigs = styled.div`
  justify-content: space-between;
  margin-top: 8px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 32px;
  align-items: flex-start;

  .saved-configs-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .input-container {
    display: flex;
    gap: 8px;
  }
`;

const ExportButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
