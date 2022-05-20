const app = Vue.createApp({
    data() {
        return {
            products: [],
            medicines: [],
            toys: [],
            formElements: ["", "", "", "", ""],
            formSeen: true,
            ingresoNombre:"",
            ingresoApellido:"",
            ingresoMail:"",
            ingresoNumero:"",
            ingresoComentario:"",
            mascotas:[],
            carrito:[],
            busqueda:"",
            productosFiltrados:[],
            

        }
    },
    methods: {
        sendForm(){
            this.formSeen = false
        },
        
        pregunta: function(){
            if( this.ingresoNombre.length == 0 || this.ingresoApellido.length == 0 || this.ingresoMail == 0 || this.mascotas.length == 0 || this.ingresoComentario.length == 0){
                swal("Ups!", "Asegurate de completar todos los campos solicitados", "error");
            }
            else if(  this.ingresoNumero.length == 0 || this.ingresoNumero.toString().length > 14 || this.ingresoNumero.toString().length < 10 ){
                swal("Ups!", "Número inválido", "error");
            }
            else{
                let formularioLoco = document.getElementById("formularioLoco")
                swal (this.ingresoNombre + "! tu consulta ha sido enviada ", "Te responderemos en la brevedad", "success");
                formularioLoco.reset()

            }
        },
        agregarCarrito: function(product){
            let i = this.carrito.findIndex(x => x._id == product._id)
            if(i == -1){
                product.cantidad = 1;
                this.carrito.push(product)
            }
            else if(this.carrito[i].cantidad+1 <= product.stock){
                this.carrito[i].cantidad += 1
            }
            else{
               swal("Error", "No hay mas stock", "error") 
            }
        },

        sacarCarrito: function(product){
            let i = this.carrito.findIndex(x => x._id == product._id)
            this.carrito[i].cantidad -= 1
            if(this.carrito[i].cantidad == 0){
                this.carrito.splice(i,1)
            }
            
        },
    
    },
    created() {
        let endpoint = "https://apipetshop.herokuapp.com/api/articulos"

        fetch(endpoint)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                this.products = [...data.response]
                this.medicines = [...data.response.filter(product => product.tipo === "Medicamento")]
                this.toys = [...data.response.filter(product => product.tipo === "Juguete")]
            })
    },
    computed: {
        isDisabled(){
            if(this.formElements.every(element=> element !== "")){
                return false
            } else {
                return true
            }
        },
        
        searchToys: function(){
            this.productosFiltrados = this.toys.filter(product => product.nombre.toUpperCase().includes(this.busqueda.toUpperCase()))
        },
        
        searchMedicines: function(){
            this.productosFiltrados = this.medicines.filter(product => product.nombre.toUpperCase().includes(this.busqueda.toUpperCase()))
        }
    }
})
let asd = app.mount("#app")