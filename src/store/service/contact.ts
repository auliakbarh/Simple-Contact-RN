import {createApi} from '@reduxjs/toolkit/query/react';
import {thunkBaseQuery} from '@/api/thunkBaseQuery';

export const contactService = createApi({
  reducerPath: 'contact',
  baseQuery: thunkBaseQuery(),
  tagTypes: ['Contact'],
  endpoints: (builder) => ({
    getAllList: builder.query<
      TResponseGetAllContact,
      void
    >({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      providesTags: () => [{ type: 'Contact', id: 'LIST' }],
    }),
    getById: builder.query<
      TResponseGetContactById,
      string
    >({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Contact', id }],
    }),
    edit: builder.mutation<
      IResponseEditContact,
      { id: string } & IBodyEditContact
    >({
      query: ({ id, ...body }) => ({
        url: `/${id}`,
        method: 'PUT',
        data: body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Contact', id: 'LIST' }, { type: 'Contact', id }]
    }),
    delete: builder.mutation<
      TResponseGetContactById,
      string
    >({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg, meta) => [{ type: 'Contact', id: 'LIST' }, { type: 'Contact', id: arg }],
    }),
    addNew: builder.mutation<
      IResponseAddNewContact,
      IBodyAddContact
    >({
      query: (body) => ({
        url: '',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: [{ type: 'Contact', id: 'LIST' }],
    }),
  }),
});

export const {useGetAllListQuery, useLazyGetByIdQuery, useAddNewMutation, useDeleteMutation, useEditMutation} = contactService;
