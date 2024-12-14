import type { NextApiRequest, NextApiResponse } from "next";
import { uploadAsset } from "../../scripts/api";
import { promises as fs } from "fs";

import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    const images = Object.values(files)[0];

    if (!Array.isArray(images)) {
      const f = await fs.readFile(images.filepath);
      const response = await uploadAsset("image", f);
      res.status(200).json(response);
    }

    res.status(300);
  });
}
