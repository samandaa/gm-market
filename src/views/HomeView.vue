<script setup>
import { ref, onMounted } from 'vue'
import axiosApiInstance from '../../api'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const cars = ref([])
const comments = ref([])
const showLoader = ref(false)

const logout = () => {
  authStore.logout()
  localStorage.removeItem('userTokens')
  router.push('/signin')
}

const getAllCars = async () => {
  showLoader.value = true
  try {
    const response = await axiosApiInstance.get(
      `https://gm-cars-1c273-default-rtdb.europe-west1.firebasedatabase.app/cars.json`
    )
    cars.value = response.data
  } catch (err) {
    console.log(err.response)
  } finally {
    showLoader.value = false
  }
}

const getAllComments = async () => {
  showLoader.value = true
  try {
    const response = await axiosApiInstance.get(
      `https://gm-cars-1c273-default-rtdb.europe-west1.firebasedatabase.app/comments.json`
    )
    comments.value = response.data
  } catch (err) {
    console.log(err.response)
  } finally {
    showLoader.value = false
  }
}

onMounted(async () => {
  await getAllCars()
  await getAllComments()
})
</script>

<template>
  <!--  Header section starts  -->
  <header>
    <input type="checkbox" name="" id="toggler" />
    <label for="toggler" class="fas fa-bars"></label>

    <a href="#" class="logo">AutoAvenue<span>.</span></a>
    <nav class="navbar">
      <a href="#home" style="text-decoration: none">Home</a>
      <a href="#about" style="text-decoration: none">About</a>
      <a href="#products" style="text-decoration: none">Products</a>
      <a href="#review" style="text-decoration: none">Review</a>
      <a href="#contact" style="text-decoration: none">Contact</a>
      <button
        @click="logout"
        style="
          position: relative;
          left: 250px;

          color: white;
          background-color: black;
          font-size: 2rem;
          color: #666;
          background-color: white;
        "
      >
        Log out
      </button>
    </nav>
    <div class="icons">
      <i class="fa-solid fa-heart"></i>
      <i class="fa-solid fa-cart-shopping"></i>
      <i class="fa-solid fa-user"></i>
    </div>
  </header>
  <!--  Header section ends -->

  <!--  Home section starts -->

  <section class="home" id="home">
    <div class="content">
      <h3>New Cars</h3>
      <span>Simple & Electronic Cars</span>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam quisquam maxime, sit
        repellat labore molestiae, quae fugit eveniet omnis earum commodi id praesentium aspernatur
        odio soluta, aut unde deleniti. Eius!
      </p>
      <a href="#" class="btn">Shop Now</a>
    </div>
  </section>

  <!--  Home section ends -->

  <!--  About section starts -->

  <section class="about" id="about">
    <h1 class="heading"><span>About</span> Us</h1>
    <div class="row">
      <div class="video-container">
        <video src="../assets/dataBaseProject/IMG_4033.MP4" loop autoplay muted></video>
        <h3>Best Car Sellers</h3>
      </div>
      <div class="content">
        <h3>Why Choose Us?</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab in ratione velit delectus
          voluptate repellat! Suscipit vero, numquam assumenda praesentium fugit aspernatur, quasi
          ea eveniet beatae amet eaque quae facilis.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis doloribus non magni
          ullam quo! Labore debitis incidunt eveniet expedita fugit vel at laborum repellendus,
          adipisci deleniti eaque illum ea inventore?
        </p>
        <a href="#" class="btn">learn more</a>
      </div>
    </div>
  </section>

  <!--  About section ends -->

  <!--  Icon section starts -->

  <section class="icons-container">
    <div class="icons">
      <img src="../assets/dataBaseProject/png11.png" alt="" />
      <div class="info">
        <h3>Cheap Delivery</h3>
        <span>On All Orders</span>
      </div>
    </div>
    <div class="icons">
      <img src="../assets/dataBaseProject/money.jpeg" alt="" />
      <div class="info">
        <h3>10 Days Returns</h3>
        <span>Moneyback Guarantee</span>
      </div>
    </div>
    <div class="icons">
      <img src="../assets/dataBaseProject/offer.png" alt="" />
      <div class="info">
        <h3>Offer & Gifts</h3>
        <span>On All Orders</span>
      </div>
    </div>
  </section>

  <!--  Icon section ends -->

  <!--  Product section starts -->

  <section class="products" id="products">
    <h1 class="heading">Latest <span>Products</span></h1>
    <div class="box-container">
      <div v-for="(car, i) in cars" :key="i" class="box">
        <span class="discount">{{ car.discount }}</span>
        <div class="image">
          <img src="../assets/dataBaseProject/150028_car.jpeg" alt="" />
          <div class="icons">
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="cart-btn">Add To Card</a>
            <a href="#" class="fas fa-share"></a>
          </div>
        </div>
        <div class="content">
          <h3>{{ car.name }}</h3>
          <div class="price">
            {{ car.price }} <span>{{ car.oldprice }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!--  Product section ends -->

  <!--  Review section starts -->

  <section class="review" id="review">
    <h1 class="heading">Customer's <span>Review</span></h1>
    <div class="box-container">
      <div v-for="(comment, e) in comments" :key="e" class="box">
        <div class="stars">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <p>
          {{ comment.text }}
        </p>
        <div class="user">
          <img
            src="../assets/dataBaseProject/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
            alt=""
          />
          <div class="user-info">
            <h3>{{ comment.name }}</h3>
            <span>{{ comment.work }}</span>
          </div>
        </div>
        <span class="fas fa-quote-right"></span>
      </div>
    </div>
  </section>

  <!--  Review section ends -->

  <!--  Contact section starts -->

  <section class="contact" id="contact">
    <h1 class="heading"><span>Contact </span>Us</h1>
    <div class="row">
      <form action="">
        <input type="text" placeholder="name" class="box" />
        <input type="email" placeholder="email" class="box" />
        <input type="number" placeholder="number" class="box" />
        <textarea name="" class="box" placeholder="message" cols="30" id="" rows="10"></textarea>
        <input type="submit" value="send-message" class="btn" />
      </form>
      <div class="image">
        <img src="../assets/dataBaseProject/captice.jpeg" alt="" />
      </div>
    </div>
  </section>

  <!--  Contact section ends -->

  <!--  Footer section starts -->

  <section class="footer">
    <div class="box-container">
      <div class="box col-3">
        <h3>Quick Links</h3>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#products">Products</a>
        <a href="#review">Review</a>
        <a href="#contact">Contact</a>
      </div>
      <div class="box col-3">
        <h3>Locations</h3>
        <a href="#">Uzbekistan</a>
        <a href="#">Usa</a>
        <a href="#">Russia</a>
        <a href="#">China</a>
        <a href="#">Japan</a>
      </div>
      <div class="box col-3">
        <h3>Contact Info</h3>
        <a href="#">+77-012-18-18</a>
        <a href="#">2220219@centralasian.uz</a>
        <a href="#">Samarqand Darvoza - 44</a>
        <img src="../assets/dataBaseProject/payments.png" alt="" />
      </div>
    </div>
    <div class="credit">Created by <span>Samandar, Abdulbosit and Nurmuhammad</span></div>
  </section>

  <!--  Footer section ends -->
</template>
