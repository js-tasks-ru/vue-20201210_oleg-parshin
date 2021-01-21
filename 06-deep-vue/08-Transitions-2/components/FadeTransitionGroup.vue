<script>
function cloneVNode(vnode) {
  const VNode = vnode.__proto__.constructor;
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory,
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}
export default {
  name: 'FadeTransitionGroup',
  render(h) {
    return h(
      'transition-group',
      {
        attrs: { ...this.$attrs, name: 'fade-list' },
        class: {
          'fade-list': true,
        },
        on: { ...this.$listeners },
      },
      [
        this.$slots.default.map((vNode) => {
          const VNode = cloneVNode(vNode);
          return h(
            VNode.tag,
            {
              key: VNode.data.key,
              class: {
                ...VNode.data.class,
                'fade-list-item': true,
              },
              staticClass: VNode.data.staticClass,
            },
            [VNode.children[0]],
          );
        }),
      ],
    );
  },
};
</script>

<style scoped>
.fade-list {
  position: relative;
}

.fade-list >>> .fade-list-item {
  opacity: 1;
  transition: opacity 0.3s ease-out;
}

.fade-list >>> .fade-list-leave-active {
  position: absolute !important;
  left: 0;
  right: 0;
}

.fade-list >>> .fade-list-enter,
.fade-list >>> .fade-list-leave-to {
  opacity: 0;
}

.fade-list >>> .fade-list-move {
  transition: transform 0.3s;
}
</style>
