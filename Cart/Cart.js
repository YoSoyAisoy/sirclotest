var arrProduk = [];
var arrJmlProduk = [];

class Cart {
    constructor(){
        this.tambahProduk = (produk, jumlah) => {
            if(arrProduk.includes(produk)){
                var newJml = arrJmlProduk[arrProduk.indexOf(produk)] + jumlah
                arrJmlProduk.splice(arrProduk.indexOf(produk), 1, (newJml))
            }else{
                arrProduk.push(produk), 
                arrJmlProduk.push((jumlah))
            }
        }
        this.hapusProduk = (produk)=>{
            function hapus  () {
                if(arrProduk.includes(produk)){
                    arrJmlProduk.splice(arrProduk.indexOf(produk),1)
                    arrProduk.splice(arrProduk.indexOf(produk),1)
                }
            }
            setTimeout(hapus , 1)
        }
        this.tampilkanCart=() =>{ 

                var showCart=()=>{
                    for(var i=0; i<arrProduk.length; i++){
                    console.log(arrProduk[i], `(${arrJmlProduk[i]})`)
                }
            }    
            setTimeout(showCart, 2)
    
        }
    }
}

var keranjang = new Cart();

keranjang.tambahProduk('Topi Putih', 2);
keranjang.tambahProduk('Kemeja Hitam', 1);
keranjang.tambahProduk('Sepatu Merah', 1);
keranjang.tambahProduk('Sepatu Merah', 4);
keranjang.tambahProduk('Sepatu Merah', 2);

keranjang.hapusProduk('Kemeja Hitam');
keranjang.hapusProduk('Baju Hijau');

keranjang.tampilkanCart();