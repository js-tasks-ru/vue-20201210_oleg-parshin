<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': loading }"
      :style="`--bg-image: ${imgUrl ? 'url(' + imgUrl + ')' : ''}`"
      @click="click"
    >
      <span>{{ inState }}</span>
      <input
        ref="input"
        type="file"
        accept="image/*"
        class="form-control-file"
        v-on="listeners"
        v-bind="$attrs"
        :disabled="loading"
      />
    </label>
  </div>
</template>

<script>
import { ImageService } from '../image-service';

export default {
  name: 'ImageUploader',
  data() {
    return {
      state: {
        upload: 'Загрузить изображение',
        remove: 'Удалить изображение',
        uploading: 'Загрузка...',
      },
      loading: false,
    };
  },
  props: {
    imageId: {
      type: [Number, null],
      default: null,
    },
  },
  model: {
    prop: 'imageId',
    event: 'change',
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        change: (e) => this.change(e),
      };
    },
    inState() {
      let value;
      if (this.imageId === null && !this.loading) {
        value = this.state.upload;
      }
      if (this.imageId === null && this.loading) {
        value = this.state.uploading;
      }
      if (this.imageId !== null && !this.loading) {
        value = this.state.remove;
      }
      return value;
    },
    imgUrl() {
      return ImageService.getImageURL(this.imageId);
    },
  },
  methods: {
    change({ target }) {
      this.loading = true;
      ImageService.uploadImage(target.files[0])
        .then(({ id }) => {
          this.loading = false; // fromm finally block to pass test
          this.$emit('change', id);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          // this.loading = false;
          target.value = '';
        });
    },
    click(e) {
      if (this.imageId !== null) {
        e.preventDefault();
        this.$emit('change', null);
        this.$refs.input.value = ''; // added to pass the test, doing that in change method
      }
      this.$emit('click', e);
    },
  },
};
</script>

<style scoped>
.image-uploader .form-control-file {
  opacity: 0;
  height: 0;
}

.image-uploader .image-uploader__preview {
  --bg-image: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    var(--bg-image);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader .image-uploader__preview > span {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader .image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader .image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
