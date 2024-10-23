<template>
  <div class="w-full">
    <section class="m-2">
      <BreadCrumbs :name="project?.name ?? 'No name'"> </BreadCrumbs>
    </section>

    <section class="m-2">
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th class="w-14">Completed</th>
              <th>Task</th>
              <th>Completed in</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in project?.tasks" :key="task.id" class="hover">
              <th>
                <input
                  class="checkbox checkbox-primary"
                  type="checkbox"
                  :checked="!!task.completedAt"
                  @change="projectStore.toggleTask(project!.id, task.id)"
                />
              </th>
              <td>{{ task.name }}</td>
              <td>{{ task.completedAt }}</td>
            </tr>

            <tr class="hover">
              <th></th>
              <td>
                <input
                  type="text"
                  class="input input-primary w-full opacity-60 transition-all hover:opacity-100 focus:opacity-100"
                  placeholder="New Task"
                  v-model="newTask"
                  @keyup.enter="addTask"
                />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useProjectsStore } from '../store/projects.store';
import type { Project } from '../interfaces/project.interface';
import BreadCrumbs from '@/modules/common/components/BreadCrumbs.vue';
import { useRouter } from 'vue-router';

interface Props {
  id: string;
}

const newTask = ref('');
const router = useRouter();
const props = defineProps<Props>();
const project = ref<Project | null>();
const projectStore = useProjectsStore();

watch(
  () => props.id,
  () => {
    project.value = projectStore.projectList.find((project) => project.id === props.id);
    if (!project.value) router.replace('/');
  },
  {
    immediate: true,
  },
);

const addTask = () => {
  if (!project.value) return;
  projectStore.addTaskToProject(project.value.id, newTask.value);
  newTask.value = '';
};
</script>
