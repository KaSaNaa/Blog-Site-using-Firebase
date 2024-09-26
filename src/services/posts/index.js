// src/services/PostService.js
import { db } from '../../configs/firebaseConfigs';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';

export const addPost = async (postType, postData, uid) => {
  const collectionName = postType === 'question' ? 'questions' : 'articles';
  return await addDoc(collection(db, collectionName), {
    ...postData,
    uid,
    date: new Date(),
  });
};

/**
 * Deletes a post from the database if the user is authorized.
 *
 * @async
 * @function deletePost
 * @param {string} postType - The type of the post, either 'question' or 'article'.
 * @param {string} postId - The unique identifier of the post to be deleted.
 * @param {string} uid - The unique identifier of the user attempting to delete the post.
 * @throws {Error} Throws an error if the user is not authorized to delete the post.
 * 
 * @example
 * // Deletes a question post with the given postId and userId
 * deletePost('question', 'postId123', 'userId456')
 *   .then(() => console.log('Post deleted successfully'))
 *   .catch(error => console.error('Error deleting post:', error));
 * 
 * @description
 * This function determines the collection name based on the post type ('questions' for 'question' and 'articles' for 'article').
 * It then retrieves the post document from the database using the provided postId. If the post exists and the userId matches
 * the uid of the post, the post is deleted. Otherwise, an error is thrown indicating that the user is not authorized to delete the post.
 */
export const deletePost = async (postType, postId, uid) => {
  const collectionName = postType === 'question' ? 'questions' : 'articles';
  const postRef = doc(db, collectionName, postId);
  const postDoc = await postRef.get();

  if (postDoc.exists && postDoc.data().uid === uid) {
    await deleteDoc(postRef);
  } else {
    throw new Error('You are not authorized to delete this post.');
  }
};
