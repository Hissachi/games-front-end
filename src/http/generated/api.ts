/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

import {
  useMutation,
  useQuery
} from '@tanstack/react-query';
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';

import type {
  GetUsers200Item,
  GetUsersId200,
  GetUsersId404,
  PostLogin200,
  PostLogin400,
  PostLogin401,
  PostLoginBody,
  PostRegister201,
  PostRegister400,
  PostRegisterBody
} from './api.schemas';

import { http } from '../client';
import type { ErrorType , BodyType } from '../client';


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * List users
 */
export const getUsers = (
    
 options?: SecondParameter<typeof http>,signal?: AbortSignal
) => {
      
      
      return http<GetUsers200Item[]>(
      {url: `/users`, method: 'GET', signal
    },
      options);
    }
  

export const getGetUsersQueryKey = () => {
    return [`/users`] as const;
    }

    
export const getGetUsersQueryOptions = <TData = Awaited<ReturnType<typeof getUsers>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>>, request?: SecondParameter<typeof http>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetUsersQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUsers>>> = ({ signal }) => getUsers(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetUsersQueryResult = NonNullable<Awaited<ReturnType<typeof getUsers>>>
export type GetUsersQueryError = ErrorType<unknown>


export function useGetUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUsers>>,
          TError,
          Awaited<ReturnType<typeof getUsers>>
        > , 'initialData'
      >, request?: SecondParameter<typeof http>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUsers>>,
          TError,
          Awaited<ReturnType<typeof getUsers>>
        > , 'initialData'
      >, request?: SecondParameter<typeof http>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>>, request?: SecondParameter<typeof http>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useGetUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>>, request?: SecondParameter<typeof http>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetUsersQueryOptions(options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * Get user by ID
 */
export const getUsersId = (
    id: string,
 options?: SecondParameter<typeof http>,signal?: AbortSignal
) => {
      
      
      return http<GetUsersId200>(
      {url: `/users/${id}`, method: 'GET', signal
    },
      options);
    }
  

export const getGetUsersIdQueryKey = (id: string,) => {
    return [`/users/${id}`] as const;
    }

    
export const getGetUsersIdQueryOptions = <TData = Awaited<ReturnType<typeof getUsersId>>, TError = ErrorType<GetUsersId404>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUsersId>>, TError, TData>>, request?: SecondParameter<typeof http>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetUsersIdQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUsersId>>> = ({ signal }) => getUsersId(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getUsersId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetUsersIdQueryResult = NonNullable<Awaited<ReturnType<typeof getUsersId>>>
export type GetUsersIdQueryError = ErrorType<GetUsersId404>


export function useGetUsersId<TData = Awaited<ReturnType<typeof getUsersId>>, TError = ErrorType<GetUsersId404>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUsersId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUsersId>>,
          TError,
          Awaited<ReturnType<typeof getUsersId>>
        > , 'initialData'
      >, request?: SecondParameter<typeof http>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetUsersId<TData = Awaited<ReturnType<typeof getUsersId>>, TError = ErrorType<GetUsersId404>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUsersId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUsersId>>,
          TError,
          Awaited<ReturnType<typeof getUsersId>>
        > , 'initialData'
      >, request?: SecondParameter<typeof http>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetUsersId<TData = Awaited<ReturnType<typeof getUsersId>>, TError = ErrorType<GetUsersId404>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUsersId>>, TError, TData>>, request?: SecondParameter<typeof http>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useGetUsersId<TData = Awaited<ReturnType<typeof getUsersId>>, TError = ErrorType<GetUsersId404>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUsersId>>, TError, TData>>, request?: SecondParameter<typeof http>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetUsersIdQueryOptions(id,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * Register a new user
 */
export const postRegister = (
    postRegisterBody: BodyType<PostRegisterBody>,
 options?: SecondParameter<typeof http>,signal?: AbortSignal
) => {
      
      
      return http<PostRegister201>(
      {url: `/register`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postRegisterBody, signal
    },
      options);
    }
  


export const getPostRegisterMutationOptions = <TError = ErrorType<PostRegister400>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postRegister>>, TError,{data: BodyType<PostRegisterBody>}, TContext>, request?: SecondParameter<typeof http>}
): UseMutationOptions<Awaited<ReturnType<typeof postRegister>>, TError,{data: BodyType<PostRegisterBody>}, TContext> => {

const mutationKey = ['postRegister'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postRegister>>, {data: BodyType<PostRegisterBody>}> = (props) => {
          const {data} = props ?? {};

          return  postRegister(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostRegisterMutationResult = NonNullable<Awaited<ReturnType<typeof postRegister>>>
    export type PostRegisterMutationBody = BodyType<PostRegisterBody>
    export type PostRegisterMutationError = ErrorType<PostRegister400>

    export const usePostRegister = <TError = ErrorType<PostRegister400>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postRegister>>, TError,{data: BodyType<PostRegisterBody>}, TContext>, request?: SecondParameter<typeof http>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postRegister>>,
        TError,
        {data: BodyType<PostRegisterBody>},
        TContext
      > => {

      const mutationOptions = getPostRegisterMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    
/**
 * Login with email and password
 */
export const postLogin = (
    postLoginBody: BodyType<PostLoginBody>,
 options?: SecondParameter<typeof http>,signal?: AbortSignal
) => {
      
      
      return http<PostLogin200>(
      {url: `/login`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postLoginBody, signal
    },
      options);
    }
  


export const getPostLoginMutationOptions = <TError = ErrorType<PostLogin400 | PostLogin401>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postLogin>>, TError,{data: BodyType<PostLoginBody>}, TContext>, request?: SecondParameter<typeof http>}
): UseMutationOptions<Awaited<ReturnType<typeof postLogin>>, TError,{data: BodyType<PostLoginBody>}, TContext> => {

const mutationKey = ['postLogin'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postLogin>>, {data: BodyType<PostLoginBody>}> = (props) => {
          const {data} = props ?? {};

          return  postLogin(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostLoginMutationResult = NonNullable<Awaited<ReturnType<typeof postLogin>>>
    export type PostLoginMutationBody = BodyType<PostLoginBody>
    export type PostLoginMutationError = ErrorType<PostLogin400 | PostLogin401>

    export const usePostLogin = <TError = ErrorType<PostLogin400 | PostLogin401>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postLogin>>, TError,{data: BodyType<PostLoginBody>}, TContext>, request?: SecondParameter<typeof http>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postLogin>>,
        TError,
        {data: BodyType<PostLoginBody>},
        TContext
      > => {

      const mutationOptions = getPostLoginMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    
