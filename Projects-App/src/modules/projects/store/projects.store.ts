import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '@vueuse/core';
import type { Project } from '../interfaces/project.interface';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(useLocalStorage<Project[]>('projects', []));

  const addProject = (name: string) => {
    if (name.length === 0) return;
    projects.value.push({
      id: uuidv4(),
      name: name,
      tasks: [],
    });
  };

  const addTaskToProject = (projectId: string, taskName: string) => {
    if (taskName.trim().length === 0) return;

    const projectFound = projects.value.find((project) => project.id === projectId);
    if (!projectFound) return;

    projectFound.tasks.push({
      id: uuidv4(),
      name: taskName,
    });
  };

  const toggleTask = (projectId: string, taskId: string) => {
    const projectFound = projects.value.find((project) => project.id === projectId);
    if (!projectFound) return;

    const taskFound = projectFound.tasks.find((task) => task.id === taskId);
    if (!taskFound) return;

    taskFound.completedAt = taskFound.completedAt ? undefined : new Date();
  };

  return {
    //Properties
    projects,

    //Getters
    projectList: computed(() => [...projects.value]),
    noProjects: computed(() => projects.value.length === 0),
    projectWithCompletion: computed(() => {
      return projects.value.map((project) => {
        const totalTasks = project.tasks.length;
        const completed = project.tasks.filter((task) => task.completedAt).length;
        const completion = totalTasks === 0 ? 0 : (completed / totalTasks) * 100;

        return {
          id: project.id,
          name: project.name,
          tasksCount: totalTasks,
          completion: Math.round(completion),
        };
      });
    }),

    //Actions
    toggleTask,
    addProject,
    addTaskToProject,
  };
});
