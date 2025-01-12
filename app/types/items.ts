type ItemView = {
    id: string;
    title: string;
    contents: string;
    user_name: string;
    view_count: number;
    comment_count: number;
    created_at: string;
};
  
export type ItemsView = {
    items: ItemView[];
    count: number;
};
  
export type Item = {
    id: string;
    title: string;
    contents: string;
    user_name: string;
    view_count: number;
    comment_count: number;
    created_at: string;
    updated_at: string;
};
  
export type PostItem = {
    user_id: number;
    title: string;
    contents: string;
    csrftoken: string;
};
  