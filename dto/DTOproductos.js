const productoConInfo = producto => {
    const productodto = {
        fyh : new Date().toLocaleString(),
        pid: process.pid,
        producto: producto.name.toUpperCase(),
        precioEnPesos: producto.price,
        precioEnUSD: producto.price / 157,
    }
    return productodto;
}

module.exports = {productoConInfo};