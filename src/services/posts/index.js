// src/services/PostService.js
import { db } from "../../configs/firebaseConfigs";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";

export const addPost = async (postType, postData, uid) => {
  const collectionName = postType === "question" ? "questions" : "articles";
  return await addDoc(collection(db, collectionName), {
    ...postData,
    uid,
    date: new Date(),
  });
};

export const deletePost = async (postType, postId, uid) => {
  const collectionName = postType === "question" ? "questions" : "articles";
  const postRef = doc(db, collectionName, postId);
  const postDoc = await postRef.get();

  if (postDoc.exists && postDoc.data().uid === uid) {
    await deleteDoc(postRef);
  } else {
    throw new Error("You are not authorized to delete this post.");
  }
};