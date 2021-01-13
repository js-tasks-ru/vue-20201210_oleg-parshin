<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': loading }"
      :style="`--bg-image: ${
        this.imgUrl ? 'url(' + this.imgUrl + ')' : 'var(--default-cover)'
      }`"
    >
      <span>{{ inState }}</span>
      <input
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
        uploading: 'Загрузка ...',
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
        click: (e) => this.click(e),
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
    imgUrl: {
      get() {
        return ImageService.getImageURL(this.imageId);
      },
      set(imageId) {
        this.change('change', imageId);
      },
    },
  },
  methods: {
    async change({ target: { files } }) {
      try {
        this.loading = true;
        const { id } = await ImageService.uploadImage(files[0]);
        console.log('opa');
        this.$emit('change', id);
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    click(e) {
      if (this.imageId !== null) {
        e.preventDefault();
        this.$emit('change', null);
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
