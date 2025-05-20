import client from './sanity';
import { generateSlug, getFormattedName } from './helpers';
import { Comment as CommentType, SanityDocument } from '../types';

export async function getProfileFromEmail(email: string) {
  const emailWithoutDomain = email.split('@')[0]; // Since some of us have .no emails and some have .com emails
  return await client.fetch(`
    *[_type=="employee" && email match "${emailWithoutDomain}"]{ _id, _type, _ref, title, firstName, lastName, image { asset-> } }[0]
  `);
}

export async function getAllPosts() {
  return await client.fetch(`
    *[_type=="toucanPost"] | order(_createdAt desc) { 
      ...,
      tags[] -> {...},
      author -> { 
        firstName,
        lastName,
        image { asset-> },
        _id,
      },
      images[]{ 
        ..., 
        asset -> {...} 
      }
    }
  `);
}

export async function getUserById(id: string) {
  return await client.fetch(
    `*[_type=="employee" && _id=="${id}"]{ _id, _type, _ref, title, firstName, lastName, email,  image { asset-> } }[0]`,
  );
}

export async function getPostById(id: string) {
  return await client.fetch(`
    *[_type=="toucanPost" && _id=="${id}"][0] { ...,
      tags[] -> {...},
      author -> { 
          firstName,
          lastName,
          offices[] -> {...},
          _id,
          image { asset-> },
      },
      images[] { asset -> { ... } },
      comments[] {
        ...,
        createdAt,
        author -> { 
          firstName,
          lastName,
          _id,
          image { asset-> },
      },
      },
    }
  `);
}

export async function getAllTags() {
  return await client.fetch(`*[_type=="tagByUser"]{_id, value, slug}`);
}

export async function getAllPostsByTag(tag: string) {
  return await client.fetch(`*[_type=='toucanPost' && "${tag}" in tags[]->slug.current ] | order(_createdAt desc) { 
      ...,
      tags[] -> {...},
      author -> { 
        firstName,
        lastName,
        image { asset-> },
      },
      images[]{ 
        ..., 
        asset -> {...} 
      }
    }`);
}

export async function getNTags(numberOfTags: number) {
  return await client.fetch(`*[_type=="tagByUser"]{_id, value, slug}[0...${numberOfTags}]`);
}

export async function getPostsByAuthorId(id: string) {
  return await client.fetch(`
    *[_type=="toucanPost" && references("${id}")] | order(_createdAt desc) { 
      ...,
      tags[] -> {...},
      author -> { 
        _id,
        firstName,
        lastName,
        image { asset-> },
      },
      images[]{ 
        ..., 
        asset -> {...} 
      }
    }
  `);
}
export async function deletePostById(id: string) {
  return await client.delete(id);
}

export async function uploadAsset(type: 'image' | 'file', asset: Blob | File | Buffer) {
  return await client.assets.upload(type, asset);
}

/**
 * Creates a new tag document in Sanity if it doesn't exist
 * If the document already exists, get its ID
 * @param tag The tag to create
 * @returns The ID of the tag
 */
export async function createTag(tag: string): Promise<string> {
  const existingTag = await client.fetch(`*[_type=="tagByUser" && value=="${tag}"]`);

  if (existingTag.length > 0) return existingTag[0]._id;

  let createdDocument = await client.create(
    {
      _type: 'tagByUser',
      value: tag,
      slug: {
        _type: 'slug',
        current: generateSlug(tag),
      },
    },
    { autoGenerateArrayKeys: true },
  );

  return createdDocument._id;
}

export async function addCommentToPost(postId: string, commentText: string, userId: string): Promise<CommentType> {
  const dateNow = new Date();
  let commentData: CommentType = {
    text: commentText,
    author: { _type: 'reference', _ref: userId },
    createdAt: dateNow.toISOString(),
  };
  const res = await client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .insert('after', 'comments[-1]', [commentData])
    .commit({ autoGenerateArrayKeys: true })
    .catch(() => {
      commentData.text = 'Error - something went wrong with your last comment';
    });
  let commentRes = commentData;
  if (res && res.comments && res.comments.length > 0 && res.comments[res.comments.length - 1]._key) {
    commentRes._key = res.comments[res.comments.length - 1]._key;
  }
  return commentRes;
}

export async function deleteCommentInPost(postId: string, commentKey: string): Promise<SanityDocument> {
  return client
    .patch(postId)
    .unset([`comments[_key=="${commentKey}"]`])
    .commit();
}
export async function createUserInSanity(
  name: string,
  email: string,
  imageToUpload: any,
  title: string,
): Promise<string> {
  const existingUser = await client.fetch(`*[_type=="employee" && email=="${email}"]`);

  if (existingUser.length > 0) return existingUser[0]._id;
  const { firstName, lastName } = getFormattedName(email, name);
  const image = await uploadBase64Image(imageToUpload, name);

  let createdDocument = await client.create({
    _type: 'employee',
    email: email,
    title: title || 'Employee',
    firstName: firstName,
    lastName: lastName,
    isOnlyForToucan: true,
    isHiddenFromEggsdesign: true,
    level: {
      _type: 'reference',
      _ref: 'd2de3156-7410-4141-a2eb-4f781f158a4e',
    },
    image: image,
    type: 'employee',
    telephone: '00000000',
  });

  return createdDocument._id;
}
export async function getUserDetailsFromFlowcase(
  email: string,
  fallbackImage: string | null,
): Promise<{ image: Blob | string; title: string }> {
  const apikey = process.env.FLOWCASE_API_KEY!;
  let image: Blob | string = fallbackImage || '';
  let title = 'Employee';

  try {
    const res = await fetch(`https://soprasteria.flowcase.com/api/v1/users/find?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apikey}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    title = data.title?.int || data.title?.no || data.role || 'Employee';

    if (data?.image?.thumb?.url) {
      const imageRes = await fetch(data.image.thumb.url);
      if (imageRes.ok) {
        image = await imageRes.blob();
      } else {
        console.warn(`Image fetch failed: ${imageRes.statusText}`);
      }
    }
  } catch (err) {
    console.warn(err);
    console.warn('Flowcase fetch failed. Using fallback image.');
  }

  return { image, title };
}
export const uploadBase64Image = async (dataUri: Blob | string, name: string) => {
  let buffer: Buffer;
  let contentType: string;

  if (typeof dataUri === 'string') {
    // Data URI case (e.g. "data:image/jpeg;base64,...")
    const matches = dataUri.match(/^data:(.+);base64,(.+)$/);
    if (!matches) throw new Error('Invalid data URI format');

    contentType = matches[1];
    const base64 = matches[2];
    buffer = Buffer.from(base64, 'base64');
  } else {
    // Blob case (from fetch)
    buffer = Buffer.from(await dataUri.arrayBuffer());
    contentType = dataUri.type || 'image/jpeg';
  }
  const fileFriendlyName = name.replace(' ', '_');

  const asset = await client.assets.upload('image', buffer, {
    contentType,
    filename: `${fileFriendlyName}-profile.jpg`,
  });

  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  };
};
