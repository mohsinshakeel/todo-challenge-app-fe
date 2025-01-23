import toast from 'react-hot-toast';

import { apiSlice } from '../api/apiSlice';
import { tasksUrl } from '@/configs/constants';

export const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchTasks: builder.query({
      query: () => ({
        url: tasksUrl,
        method: 'GET',
      }),
      keepUnusedDataFor: 600,
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: ['Tasks'],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          toast.error(error.message);
        }
      },
    }),

    createTask: builder.mutation({
      query: (data) => ({
        url: tasksUrl,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Tasks'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          toast.success(result.data.message);
        } catch (error: any) {
          toast.error(error.message);
        }
      },
    }),

    updateTask: builder.mutation({
      query: (data) => ({
        url: `${tasksUrl}/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Tasks'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          toast.success(result.data.message);
        } catch (error: any) {
          toast.error(error.message);
        }
      },
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `${tasksUrl}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          toast.success(result.data.message);
        } catch (error: any) {
          toast.error(error.message);
        }
      },
    }),

    fetchTaskById: builder.query({
      query: (id) => ({
        url: `${tasksUrl}/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 600,
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const {
  useFetchTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useFetchTaskByIdQuery,
} = tasksApi;
