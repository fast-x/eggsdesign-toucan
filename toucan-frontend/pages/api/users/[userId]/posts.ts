import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { promises as fs } from 'fs';
import { createTag, getPostsByAuthorId, uploadAsset } from '../../../../scripts/api';
import client from '../../../../scripts/sanity';
import { splitStringToArray } from '../../../../scripts/helpers';
import { Post } from '../../../../types';

type Data = {
  posts: Post[];
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      const images = Object.values(files);
      // Get array of images data after they all have been uploaded to Sanity
      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          if (Array.isArray(image)) return {};

          const file = await fs.readFile(image.filepath);
          const { uploadId, name, _id } = await uploadAsset('image', file);

          return {
            _type: 'image',
            _key: uploadId,
            name: name,
            asset: {
              _type: 'reference',
              _ref: _id,
            },
          };
        }),
      );

      const parsedTags = splitStringToArray(fields.tags as string);

      // Create new tag documents in Sanity and get their IDs if they don't exist
      // If the document already exists, get its ID

      const tags = await Promise.all(
        parsedTags.map(async (tag: string) => {
          const tagID = await createTag(tag);
          return {
            _type: 'reference',
            _ref: tagID,
          };
        }),
      );

      await client.create({
        _type: 'toucanPost',
        title: fields.title,
        description: fields.description,
        tags,
        author: {
          _ref: fields.authorId,
        },
        images: uploadedImages,
      });

      const posts = await getPostsByAuthorId(req.query.userId as string);
      res.status(200).json({ posts });
    });
  } else if (req.method === 'GET') {
    const posts = await getPostsByAuthorId(req.query.userId as string);
    res.status(200).json({ posts });
  }
}
