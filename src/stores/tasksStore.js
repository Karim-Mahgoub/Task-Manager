import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";

export const useTasksStore = defineStore("tasks", () => {
  let tasks = reactive(
    JSON.parse(localStorage.getItem("tasks")) || [
      {
        name: "Website design",
        description:
          "Define the style guide, branding and create the webdesign on Figma.",
        completed: true,
        id: 1,
      },
    ],
  );

  let filterBy = ref("");

  let modalIsActive = ref("false");

  function setFilter(value) {
    filterBy.value = value;
  }

  const filteredTasks = computed(() => {
    switch (filterBy.value) {
      case "todo":
        return store.tasks.filter((task) => !task.completed);
      case "done":
        return store.tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  });

  function addTask(newTask) {
    if (newTask.name && newTask.description) {
      newTask.id = tasks.length
        ? Math.max(...tasks.map((task) => task.id)) + 1
        : 1;
      tasks.push(newTask);
      closeModal();
    } else {
      alert("Please enter title and description for the task");
    }
  }

  function toggleCompleted(id) {
    tasks.forEach((task) => {
      if (task.id === id) {
        task.completed = !task.completded;
      }
    });
  }

  function openModal() {
    modalIsActive.value = true;
  }

  function closeModal() {
    modalIsActive.value = false;
  }

  return {
    tasks,
    filterBy,
    setFilter,
    filteredTasks,
    addTask,
    toggleCompleted,
    openModal,
    closeModal,
    modalIsActive,
  };
});
