<script setup>
import Scroll from '../scroll/scroll.vue';
import { usePlayStateStore } from '@/store/playState.js'
import useMode from './use-mode';
import useFavorite from './use-favorite'

const playState = usePlayStateStore()
const playList = computed(() => playState.state.playList)
const sequenceList = computed(() => playState.state.sequenceList)
const currentSong = computed(() => playState.currentSong())
const visible = ref(false)
const removing = ref(false)
const scrollRef = ref(null)
const listRef = ref(null)
const dialog = ref(false)

// hooks
const { modeIcon, modeText, changeMode } = useMode()
const { isFavorite, toggleFavorite, FavoriteIcon } = useFavorite()

watch(currentSong,async (ns) => {
  if(!visible || !ns?.id){
    return
  }
  await nextTick()
  scrollToCurrent()
})

const getCurrentIcon = (song) => {
  if(song.id === currentSong.value.id){
    return 'mdi-disc-player'
  }else{
    return ''
  }
}

const show = async () => {
  visible.value = true

  await nextTick()
  refreshScroll()
  scrollToCurrent()
}

const hide = () => {
  visible.value = false
}

// 点击切歌
const selectItem = (song) => {
  const index = playList.value.findIndex((item) => {
    return item.id === song.id
  })
  playState.state.currentIndex = index
  playState.state.playing = true
}

const refreshScroll = () => {
  scrollRef.value.scroll.refresh()
}

// 滚动跳转
const scrollToCurrent = () => {
  const index = sequenceList.value.findIndex((song) => {
    return currentSong.value.id === song.id
  })
  if(index === -1){
    return
  }
  const target = listRef.value.$el.children[index]
  scrollRef.value.scroll.scrollToElement(target, 300)
}

const removeSong = (song) => {
  if(removing.value){
    return
  }
  removing.value = true
  playState.removeSong(song)
  if(!playList.value.length){
    hide()
  }
  setTimeout(() => {
    removing.value = false
  }, 300) // 防止多次点击
}

const clear = () => {
  playState.clearSongList()
  dialog.value = false
  hide()
}

// 暴露方法
defineExpose({ show })
</script>

<template>
  <teleport to="body">
    <transition name="list-fade">
      <div
        class="playlist tw-fixed tw-left-0 tw-right-0 tw-top-0  tw-bottom-0 tw-z-[2000] tw-bg-[#333] tw-bg-opacity-30"
        v-show="visible && playList.length"
        @click="hide"
      >
        <div 
          class="list-wrapper tw-fixed tw-left-0 tw-bottom-0 tw-z-[210] tw-w-full tw-bg-white"
          @click.stop
        >
          <div class="list-header tw-relative tw-pt-5 tw-pr-8 tw-pb-3 tw-pl-5">
            <div class="title tw-flex tw-items-center">
              <v-icon 
                class="tw-rounded-full tw-mr-2"
                size="28" @click.stop="changeMode" :icon="modeIcon"
              ></v-icon>
              <span class="text tw-flex-1">{{modeText}}</span>
              <v-icon icon="mdi-trash-can-outline" @click="dialog = true"></v-icon>
              <v-dialog
                v-model="dialog"
                width="auto"
                class=""
                
              >
                <v-card
                  class="rounded-xl tw-text-center"
                  width="200"
                  height="100"
                  text="是否清空播放列表"
                >
                  <div class=" tw-flex tw-justify-center">
                    <v-btn
                      class=" tw-flex-1"
                      text="取消"
                      @click="dialog = false"
                    ></v-btn>
                    <v-btn
                      class="tw-flex-1"
                      text="清空"
                      @click="clear"
                    ></v-btn>
                  </div>
                </v-card>
              </v-dialog>
            </div>
          </div>

          <Scroll
            ref="scrollRef"
            class="list-content tw-max-h-64 tw-overflow-hidden"
          >
            <transition-group
              ref="listRef"
              name="list"
              appear
              tag="ul"
            >
              <li
                class="item tw-flex tw-items-center tw-justify-around tw-h-11 tw-py-0 tw-pr-5 tw-pl-5 tw-overflow-hidden"
                v-for="song in sequenceList"
                :key="song.id"
                @click="selectItem(song)"
              >
                <span 
                  v-if="getCurrentIcon(song)" 
                  class=" tw-text-red-500 current tw-flex-grow-0 tw-shrink-0 tw-basis-5 tw-w-5 tw-min-w-5 tw-mr-5">
                  <v-icon
                    size="28"
                    :icon="getCurrentIcon(song)"
                  ></v-icon>
                </span>
                
                <span 
                  class="text tw-flex-1 tw-text-base tw-truncate"
                >
                  <span
                    v-if="song.fee == 1" 
                    class=" tw-text-red-400 tw-border-solid tw-border tw-text-xs tw-rounded tw-px-0.5 tw-mr-1"
                  >VIP</span>
                  <span
                   class="tw-opacity-80"
                   :class="{'tw-text-red-600': getCurrentIcon(song)}"
                  >
                    {{song.name}}
                  </span>
                  <span
                    class="tw-text-center tw-text-sm tw-leading-5 tw-font-normal tw-opacity-60"
                    :class="{'tw-text-red-600 tw-opacity-80': getCurrentIcon(song)}"
                  > -  {{ song?.ar[0]?.name }}</span>
                </span>
                <span class="tw-mr-4 tw-text-sm">
                  <v-icon 
                    @click.stop="toggleFavorite(song)"
                    class="tw-rounded-full" 
                    :class="{'favorite': isFavorite(song)}"
                    size="26" :icon="FavoriteIcon(song)"
                  ></v-icon>
                </span>
                <span
                  class="delete"
                  @click.stop="removeSong(song)"
                >
                  <v-icon size="24" icon="mdi-close"></v-icon>
                </span>
              </li>
            </transition-group>
          </Scroll>

          <div class="list-footer tw-text-center tw-leading-10" @click.stop="hide">
            <span>关闭</span>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.playlist {
  &.list-fade-enter-active, &.list-fade-leave-active {
    transition: opacity .3s;
    .list-wrapper {
      transition: all .3s;
    }
  }
  &.list-fade-enter-from, &.list-fade-leave-to {
    opacity: 0;
    .list-wrapper {
      transform: translate3d(0, 100%, 0);
    }
  }
  .list-enter-active, .list-leave-active {
    transition: all 0.3s;
  }

  .list-enter-from, .list-leave-to {
    height: 0 !important;
  }
}

.disable {
  color: rgba(255, 255, 255, 0.5);
}

.favorite {
  color: rgba(235, 60, 60);
}

</style>