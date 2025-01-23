// pages/tasks/CreateTask.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';

import AppLayout from '@/layouts/AppLayout';
import { tasksUrl } from '@/configs/constants';
import { useCreateTaskMutation } from '@/store/features/tasks/tasksApi';

import TaskForm, { TaskFormValues } from '../common/TaskForm';
import { Status } from '@/types';

const CreateTask: React.FC = () => {
  const router = useRouter();
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const handleSubmit = (values: TaskFormValues) => {
    const formData = {
      ...values,
      status: Status.PENDING, 
    };
    createTask(formData)
      .unwrap()
      .then(() => {
        router.push(tasksUrl);
      });
  };

  return (
    <AppLayout title="Tasks" showAddButton={false}>
      <div className="mt-16 flex flex-col w-full">
        <ArrowLeftIcon
          className="w-6 h-6 cursor-pointer"
          onClick={() => router.push(tasksUrl)}
        />
        <TaskForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </AppLayout>
  );
};

export default CreateTask;
