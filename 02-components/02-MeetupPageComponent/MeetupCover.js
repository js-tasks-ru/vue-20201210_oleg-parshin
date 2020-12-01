export const MeetupCover = {
  template: `<div class="meetup-cover" :style="{'--bg-url': link ? 'url(' + link + ')' : ''}">
        <h1 class="meetup-cover__title">{{title}}</h1>
    </div>`,

  props: {
    link: {
      type: String,
    },
    title: {
      type: String,
    },
  },
};
