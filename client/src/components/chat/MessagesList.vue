<script setup lang="ts">
import { computed, reactive, useTemplateRef } from 'vue';
import ActiveGameMessage from "@/components/chat/ActiveGameMessage.vue";

/**
 * — Поддержка нескольких чатов
 * — Табы, для переключения между чатами
 * — Информация о новых сообщениях
 * — Реакции на сообщения
 * — Вывод списка игр по нажатию на кнопку активности
 * — Возможность посмотреть в каждой кол-во игроков и кто
 * — Иконки к сообщениям, и хвостики )
 */
interface IActiveGames {
  count: number;
  list: string[];
}
const activeGames = reactive<IActiveGames>({
  count: 0,
  list: [],
});
const root = useTemplateRef<HTMLDivElement>("root");
const rootElement = computed(() => root.value || undefined);

const isHiddenAction = (id: number) => {
	console.log('HIDDEN', id);
}
</script>

<template>
  <div class="mx-4 mt-4 overflow-y-scroll">
    <div class="relative flex flex-col gap-4" ref="root">
      <div v-if="activeGames.count" class="bg-lime-200">
        Сейчас {activeGames.count} активно игр
      </div>
      <div
        class="flex items-center py-2 px-4 bg-slate-50 rounded-md border-slate-100"
      >
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata
      </div>
      <ActiveGameMessage :root="rootElement" @isHidden="isHiddenAction" >
        Join to new game<br />
        1 of 2 Players
      </ActiveGameMessage>
      <div
        class="flex items-center py-2 px-4 bg-slate-50 rounded-md border-slate-100"
      >
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
      </div>
      <div
        class="flex items-center py-2 px-4 bg-slate-50 rounded-md border-slate-100"
      >
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusa
      </div>
      <div
        class="flex items-center py-2 px-4 bg-slate-50 rounded-md border-slate-100"
      >
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut
      </div>
      <div
        class="flex items-center py-2 px-4 bg-slate-50 rounded-md border-slate-100"
      >
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata
      </div>
      <div
        class="flex items-center py-2 px-4 bg-slate-50 rounded-md border-slate-100"
      >
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata
      </div>
    </div>
  </div>
</template>

<style scoped></style>