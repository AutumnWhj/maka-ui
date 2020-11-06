---
title: Button
---

# 按钮
<script>
export default {
  data() {
    return {
      button: '默认'
    }
  }
}
</script>

<template>
  <mk-button>{{button}}</mk-button>
  <mk-button type="primary">主色</mk-button>
  <mk-button type="success">成功</mk-button>
  <mk-button type="info">提示</mk-button>
</template>


### 使用
```html
<mk-button>默认</mk-button>
<mk-button type="primary">主色</mk-button>
<mk-button type="success">成功</mk-button>
<mk-button type="info">提示</mk-button>
```