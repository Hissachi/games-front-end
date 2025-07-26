/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

export type GetUsers200Item = {
  id: string;
  name: string;
  email: string;
};

export type GetUsersId200 = {
  id: string;
  name: string;
  email: string;
};

export type GetUsersId404 = {
  message: string;
};

export type PostRegisterBody = {
  name: string;
  /** @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$ */
  email: string;
  /**
   * @minLength 4
   * @maxLength 14
   */
  password: string;
};

export type PostRegister201 = {
  id: string;
  name: string;
  email: string;
};

export type PostRegister400 = {
  message: string;
};

export type PostLoginBody = {
  /** @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$ */
  email: string;
  password: string;
};

export type PostLogin200User = {
  id: string;
  name: string;
  email: string;
};

export type PostLogin200 = {
  token: string;
  user: PostLogin200User;
};

export type PostLogin400 = {
  message: string;
};

export type PostLogin401 = {
  message: string;
};

