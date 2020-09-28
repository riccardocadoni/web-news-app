export interface CreatorInfoType {
  firstName: string;
  lastName: string;
  fields?: string[];
  creatorId: string;
  profilePic?: string;
}
export interface CreatorContentType {
  content: any;
  coverUrl: string;
  createdAt: string; // JSON.stringify
  editedAt: string;
  creatorId: string;
  creatorName: string;
  creatorPicUrl: string;
  contentId: string;
  title: string;
  type: number;
}
