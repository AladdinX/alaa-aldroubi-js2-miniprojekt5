import { onValue, ref, push, update, remove } from "firebase/database";
import { Comment } from "./mod/Comment";
import { db } from "./mod/firebase"

const dbRef = ref(db, '/Comments');
const userNameValue = document.querySelector('#user-name') as HTMLInputElement;
let comments: Comment[] = [];

document.querySelector('#start-button').addEventListener('click', () => {
  (document.querySelector('#welcome-massage') as HTMLHeadingElement).innerText = `Hello ${userNameValue.value} if u want to delete your old comments click on it !!!`;
  onValue(dbRef, snapshot => {
    (document.querySelector('#comment-container') as HTMLDivElement).style.display = 'inline-block';
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
        (document.querySelector(`#${comment.id}`) as HTMLHeadingElement).style.color = 'white';
        document.querySelector(`#${comment.id}`).addEventListener('click', () => {
          const deleteRef = ref(db, '/Comments/' + comment.id);
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
    const commentRef = ref(db, '/Comments/' + comments[0].id);
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
