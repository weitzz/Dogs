export type TLogin = {
    username: string;
    email?: string
    password: string;
}



export type TUser = {
    id: number;
    email: string;
    nome: string;
    username: string;
    password?: string | number | undefined;
}

export type IToken = {
    token: string | null
}


export interface IPhoto {
    key: number
    id: number
    src: string;
    title: string;
    acessos: string;
    author: string;
    idade: string;
    peso: string;
    total_comments: string;
}

export type FeedModalProps = {
    photo: IPhoto;
    setModalPhoto: React.Dispatch<React.SetStateAction<IPhoto | undefined>>;
};


export type TComment = {
    comment_ID: string;
    comment_agent: string;
    comment_approved: string;
    comment_author: string;
    comment_author_IP: string;
    comment_author_email: string;
    comment_author_url: string;
    comment_content: string;
    comment_date: string;
    comment_date_gmt: string;
    comment_karma: string;
    comment_parent: string;
    comment_post_ID: string;
    comment_type: string;
    user_id: string;
}