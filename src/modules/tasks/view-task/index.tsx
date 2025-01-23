'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';

import AppLayout from '@/layouts/AppLayout';
import {
  useFetchTaskByIdQuery,
  useUpdateTaskMutation,
} from '@/store/features/tasks/tasksApi';
import { tasksUrl } from '@/configs/constants';

import TaskForm, { TaskFormValues } from '../common/TaskForm';
import NotFoundWithLoading from './components/NotFound';

const ViewTask: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();

  const { data, isFetching, error } = useFetchTaskByIdQuery(id as string);

  const [initialValues, setInitialValues] = useState<
    TaskFormValues | undefined
  >();

  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

  useEffect(() => {
    if (data && data.data) {
      setInitialValues({
        title: data.data.title || '',
        color: data.data.color || '',
      });
    }
  }, [data]);

  const handleSubmit = (values: TaskFormValues) => {
    updateTask({
      id: id as string,
      ...values,
    })
      .unwrap()
      .then(() => {
        router.push(tasksUrl);
      });
  };

  const handleGoBack = () => {
    router.push(tasksUrl);
  };

  return (
    <AppLayout title="View Task" showAddButton={false}>
      <div className="mt-16 flex flex-col w-full">
        <ArrowLeftIcon
          className="w-6 h-6 cursor-pointer"
          onClick={handleGoBack}
        />
        {!id || error || isFetching ? (
          <NotFoundWithLoading isLoading={isFetching} />
        ) : (
          <TaskForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            isLoading={isUpdating}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default ViewTask;
