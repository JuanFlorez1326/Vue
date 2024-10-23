<template>
  <aside class="bg-base-200 w-72 min-h-screen">
    <RouterLink to="/" class="text-lg font-bold mx-4">Projects</RouterLink>
    <p class="text-sm text-gray-500 mx-4" v-if="projectsStore.noProjects">Projects not found</p>

    <ul v-else class="menu">
      <li v-for="project in projectsStore.projectList" :key="project.id">
        <template v-if="project.tasks.length">
          <details open>
            <summary>
              <RouterLink :to="`/project/${project.id}`">{{ project.name }}</RouterLink>
            </summary>
            <ul>
              <li v-for="task in project.tasks" :key="task.id">
                <RouterLink :to="`/project/${project.id}`">{{ task.name }}</RouterLink>
              </li>
            </ul>
          </details>
        </template>

        <template v-else>
          <RouterLink :to="`/project/${project.id}`">{{ project.name }}</RouterLink>
        </template>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { useProjectsStore } from '../store/projects.store';

const projectsStore = useProjectsStore();
</script>
