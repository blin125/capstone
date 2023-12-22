import NavbarComp from '../components/NavbarComp';
import Sidebar from '../components/Sidebar';
import ShoppingCart from '../components/ShoppingCart';

function Cart() {
  return (
    <>
      <NavbarComp />
      <div className="homepage-container">
        <div className="content-container">
          <Sidebar />
          <ShoppingCart />
        </div>
      </div>
    </>
  );
}

export default Cart;
