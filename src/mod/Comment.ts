export class Comment {
  constructor(
    public readonly id: string,
    public readonly name: string,
    private readonly commentText: string) {
    this.displayTask();
  }
  private displayTask(): void {
    const h3: HTMLHeadingElement = document.createElement('h3');
    h3.id = this.id;
    h3.innerText = `User: ${this.name}- Comment: ${this.commentText}`;
    document.querySelector('#comment-container').append(h3);
  }
  public clearDOM(): void {
    (document.querySelector(`#${this.id}`) as HTMLHeadingElement).remove();
  }
} 
