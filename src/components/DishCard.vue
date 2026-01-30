<template>
  <div class="dish-card" @click="handleCardClick">
    <div class="dish-image">
      <img :src="item.image" :alt="item.name" />
      <div v-if="item.tag" class="dish-tag">{{ item.tag }}</div>
    </div>
    <div class="dish-info">
      <h3 class="dish-name">{{ item.name }}</h3>
      <p class="dish-desc">{{ item.description }}</p>
      <div class="dish-footer">
        <div class="price">
          <span class="price-currency">₱</span>{{ item.price }}
        </div>
        <button 
          class="add-cart"
          @click.stop="handleAddToCart"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'DishCard',
  props: {
    item: Object
  },
  emits: ['add-to-cart', 'card-click'],
  setup(props, { emit }) {
    const buttonText = ref('+');

    const handleAddToCart = (e) => {
      emit('add-to-cart', e, props.item.name);
      buttonText.value = '✓';
      setTimeout(() => {
        buttonText.value = '+';
      }, 800);
    };

    const handleCardClick = () => {
      emit('card-click', props.item.name);
    };

    return {
      buttonText,
      handleAddToCart,
      handleCardClick
    };
  }
}
</script>

<style scoped>
.dish-card {
  background: white;
  border: 3px solid var(--charcoal);
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
}

.dish-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0 var(--upang-green);
}

.dish-image {
  height: 200px;
  border-bottom: 3px solid var(--charcoal);
  position: relative;
  overflow: hidden;
  background: #f0f0f0;
}

.dish-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dish-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(200, 169, 97, 0.05) 10px,
    rgba(200, 169, 97, 0.05) 20px
  );
}

.dish-tag {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--upang-gold);
  color: var(--upang-dark-green);
  padding: 0.4rem 1rem;
  font-weight: 800;
  font-size: 0.7rem;
  letter-spacing: 1px;
  z-index: 1;
}

.dish-info {
  padding: 24px;
}

.dish-name {
  font-family: 'Archivo Black', sans-serif;
  font-size: 21px;
  margin-bottom: 8px;
  color: var(--upang-green);
  letter-spacing: -0.5px;
}

.dish-desc {
  font-size: 14px;
  color: var(--mid-gray);
  margin-bottom: 19px;
  line-height: 1.5;
}

.dish-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 2px solid var(--cream);
}

.price {
  font-family: 'Archivo Black', sans-serif;
  font-size: 32px;
  color: var(--charcoal);
  letter-spacing: -1px;
}

.price-currency {
  font-size: 19px;
  color: var(--mid-gray);
}

.add-cart {
  background: var(--upang-green);
  color: var(--upang-gold);
  width: 50px;
  height: 50px;
  border: 3px solid var(--charcoal);
  font-size: 1.5rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-cart:hover {
  background: var(--charcoal);
  color: var(--upang-gold);
  transform: scale(1.1);
}
</style>
