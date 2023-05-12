<template>
  <form @submit.prevent>
    <div class="uk-margin">
      <label class="uk-form-label" for="name">Имя</label>

      <div class="uk-form-controls">
        <input
          v-model="form.name"
          required
          id="name"
          class="uk-input"
          type="text"
          placeholder="Введите ваше имя"
        />
      </div>
    </div>

    <div class="uk-margin">
      <label class="uk-form-label" for="comment">Комментария</label>

      <div class="uk-form-controls">
        <textarea
          v-model="form.comment"
          required
          id="comment"
          class="uk-textarea"
          placeholder="Введите текст"
          rows="4"
        />
      </div>
    </div>

    <div class="uk-margin-medium-bottom">
      <label class="uk-form-label" for="name">Количество запросов</label>

      <div class="uk-form-controls">
        <input
          v-model="form.count"
          required
          min="1"
          max="1000"
          id="name"
          class="uk-input"
          type="number"
          placeholder="Введите количество запросов"
        />
      </div>
    </div>

    <button
      v-if="interval"
      class="uk-button uk-button-danger uk-width"
      @click="onStop"
    >
      Остановить
    </button>

    <button
      v-else
      class="uk-button uk-button-secondary uk-width"
      :disabled="loading"
      @click="onSend"
    >
      Отправить
    </button>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useAlert } from "@/hooks/useAlert";
import { form } from "@/data/form";
import { baseUrl } from "@/data/consts";

const alert = useAlert();

const interval = ref<number | null>(null);
const loading = ref<boolean>(false);

const requestCount = computed<number[]>(() => {
  const result = [];
  for (let i = 10; i <= 1000; i += 10) result.push(i);
  return result;
});

const onSend = () => {
  const valid =
    Object.values(form).filter(
      (value: string | number) => value?.toString()?.trim()?.length
    ).length === Object.keys(form).length;

  if (valid) {
    let count = 0;
    let data = new FormData();
    let errors = true;

    data.append("name", form.name);
    data.append("comment", form.comment);

    loading.value = true;
    interval.value = setInterval(() => {
      count++;

      fetch(baseUrl + "/api/comment/store", {
        method: "post",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.code === 200) alert.successToast("Выполнено успешно");
          else {
            onStop();
            if (errors)
              alert.errorToast(
                "Слишком много запросов отправлено за указанный период времени"
              );
            errors = false;
          }
        })
        .catch(() => {
          onStop();
          if (errors)
            alert.errorToast(
              "Слишком много запросов отправлено за указанный период времени"
            );
          errors = false;
        })
        .finally(() => (loading.value = false));

      if (count === form.count) onStop();
    }, 0);
  }
};

const onStop = () => {
  if (interval.value) clearInterval(interval.value);
  interval.value = null;
  loading.value = false;
};
</script>
