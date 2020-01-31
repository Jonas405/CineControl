export interface Roles {
    editor?: boolean;
    admin?: boolean;
  }

export interface CheckersInterface {
    checkerMail?: string;
    checkerName?: string;
    imageURL?: string;
    asignedTheaters?: object;
    key?: string;
    userID?: string;
  }


export interface CheckerInterface {
  checkerMail?: string;
  checkerName?: string;
  checkerImageUrl?: string;
  imageURL?: string;
  asignedTheaters?: object;
  key?: string;
  userID?: string;
}
