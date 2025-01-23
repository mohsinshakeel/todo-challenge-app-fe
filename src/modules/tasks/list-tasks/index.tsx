'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import AppLayout from '@/layouts/AppLayout';
import {
  useDeleteTaskMutation,
  useFetchTasksQuery,
  useUpdateTaskMutation,
} from '@/store/features/tasks/tasksApi';
import { ITask, Status } from '@/types';
import { tasksUrl } from '@/configs/constants';

import NoData from './components/NoData';
import Card from './components/Card';

const ListTasks: React.FC = () => {
  const router = useRouter();

  const { data, isFetching } = useFetchTasksQuery({});

  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleToggleCompleted = (task: ITask) => {
    const value = task.status === Status.COMPLETED;

    updateTask({
      id: task.id,
      status: value === true ? Status.PENDING : Status.COMPLETED,
    });
  };

  const handleDelete = (id: string) => {
    deleteTask(id);
  };

  const handleAddTask = () => {
    router.push(`${tasksUrl}/create`);
  };

  const handleCardClick = (id: string) => {
    router.push(`${tasksUrl}/view/${id}`);
  };

  return (
    <AppLayout title="Tasks" showAddButton onClickAddButton={handleAddTask}>
      <div className="mt-20 flex flex-col items-center w-full ">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-bold text-primary">Tasks</h1>
            <span className="text-xs bg-border text-foreground font-bold rounded-xl px-3 py-1">
              {data?.data.length}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-bold text-secondary ">Completed</h1>
            <span className="text-xs bg-border text-foreground font-bold rounded-xl px-2 py-1">
              {
                data?.data.filter(
                  (task: ITask) => task.status === Status.COMPLETED
                ).length
              }
              &nbsp;de&nbsp;
              {data?.data.length}
            </span>
          </div>
        </div>
        {data?.data.length === 0 || isFetching ? (
          <NoData isFetching={isFetching} />
        ) : (
          <>
            {data?.data.map((task: ITask) => (
              <Card
                key={task.id}
                title={task.title}
                onToggleCompleted={() => handleToggleCompleted(task)}
                onDelete={() => handleDelete(task.id)}
                isCompleted={task.status === Status.COMPLETED}
                onClickCard={() => handleCardClick(task.id)}
              />
            ))}
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default ListTasks;
