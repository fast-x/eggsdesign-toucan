import React, { useState } from 'react';
import styled from 'styled-components';

type Props = { images: { url: string; _key: string; credits?: string }[] };

export function isValidImageForSlider(
  image: Partial<{ url: string; _key: string; credits?: string }> | null,
): image is { url: string; _key: string; credits?: string } {
  if (!image) return false;
  return !!image?.url && !!image?._key;
}

export const ImageSlider = ({ images }: Props): React.FunctionComponentElement<Props> => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length <= 0) {
    return <div>No images</div>;
  }

  const handleClickThumbnail = (selectedIndex: number) => {
    setActiveIndex(selectedIndex);
  };

  const activeImageClass = (i: number): object | boolean => i === activeIndex && { className: 'active-main-image' };
  const activeThumbnailClass = (i: number): object | boolean => i === activeIndex && { className: 'active-thumbnail' };

  return (
    <Container>
      <Images>
        {images &&
          images.map((image, i) => (
            <MainImage
              key={`main-image-${image._key}`}
              {...activeImageClass(i)}
              href={image.url}
              target="_blank"
              rel="noreferrer">
              <img src={`${image.url}?h=800`} alt={image.credits} />
              {image.credits && <Credits>{image.credits}</Credits>}
            </MainImage>
          ))}
      </Images>

      {images && images.length > 1 && (
        <ProjectImages>
          {images.map((image, i) => {
            return (
              <ProjectImage
                {...activeThumbnailClass(i)}
                onClick={(): void => handleClickThumbnail(i)}
                key={`thumbnail-${image._key}`}>
                <img src={`${image.url}?h=300`} alt="" />
              </ProjectImage>
            );
          })}
        </ProjectImages>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  width: 100%;
`;

const Images = styled.div``;

const Credits = styled.div`
  background: rgba(0, 0, 0, 0.3);
  color: white;
  position: absolute;
  bottom: 16px;
  z-index: 2;
  padding: 0.4em 1em;
  border-radius: 4px;
  left: 50%;
  transform: translate(-50%);
  max-width: calc(100% - 32px);
  width: max-content;
`;

const MainImage = styled.a`
  aspect-ratio: 16/9;
  width: 100%;
  display: none;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.08);
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &.active-main-image {
    display: block;
  }
`;

const ProjectImages = styled.div`
  display: flex;
  max-height: 400px;
  padding: 20px 0;
  overflow: scroll;
  white-space: nowrap;
`;

const ProjectImage = styled.div`
  margin-right: 20px;
  display: inline-block;
  border-radius: 8px;
  background-color: transparent;
  height: 80px;
  width: 120px;
  min-width: 120px;
  cursor: pointer;
  opacity: 0.8;
  overflow: hidden;
  transition: all 0.1s ease-in-out;
  border: 1px solid transparent;

  &:hover,
  &.active-thumbnail {
    opacity: 1;
    border: 1px solid black;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
