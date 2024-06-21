// Purpose: Interface for the IdeaItem type.
export interface IdeaItem {
    id?: number; 
    title: string; 
    description: string;
    upvotes?: number; 
    downvotes?: number;
    UserUserName?: string; 
    createdAt?: Date; 
    updatedAt?: Date;
  }
  