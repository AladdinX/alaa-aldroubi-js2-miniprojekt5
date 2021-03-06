import { onValue, ref, push, update, remove, DatabaseReference } from "firebase/database";
import { Comment } from "./mod/Comment";
import { db } from "./mod/firebase"

const dbRef: DatabaseReference = ref(db, '/Comments');
const userNameValue = document.querySelector('#user-name') as HTMLInputElement;
let comments: Comment[] = [];

document.querySelector('#start-button').addEventListener('click', () => {

  (document.querySelector('#welcome-massage') as HTMLHeadingElement).innerText = `Hello ${userNameValue.value} if u want to delete your old comments click on it !!!`;
  (document.querySelector('#comment-form') as HTMLFormElement).style.display = 'block';
  (document.querySelector('#comment-container') as HTMLDivElement).style.display = 'inline-block';

  onValue(dbRef, snapshot => {
    const commentsData = snapshot.val();
    for (const comment of comments) {
      comment.clearDOM();
    }
    comments = [];
    for (const key in commentsData) {
      comments.push(new Comment(
        key,
        commentsData[key].name,
        commentsData[key].comment
      ));
    }
    for (const comment of comments) {
      if (comment.name == userNameValue.value) {
        const commentH3: HTMLHeadingElement = document.querySelector(`#${comment.id}`);
        commentH3.style.color = 'white';
        commentH3.addEventListener('click', () => {
          const deleteRef: DatabaseReference = ref(db, '/Comments/' + comment.id);
          remove(deleteRef);
        })
      }
    }
    (document.querySelector('#start-div') as HTMLDivElement).style.display = 'none';
  })
});

document.querySelector('#add').addEventListener('click', e => {
  e.preventDefault();
  if (comments.length > 24) {
    const commentRef: DatabaseReference = ref(db, '/Comments/' + comments[0].id);
    remove(commentRef)
  }
  const commentToAdd = {
    comment: (document.querySelector("#new-comment") as HTMLInputElement).value,
    name: userNameValue.value
  }
  const newKey: string = push(dbRef).key;
  const newComment = {};
  newComment[newKey] = commentToAdd;
  update(dbRef, newComment);
})
