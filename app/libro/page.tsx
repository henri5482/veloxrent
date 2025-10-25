"use client";
import { useRef } from 'react';
import Footer from "../footer";
import Navbar from "../navbar";

const Page = () => {
    // 1. Hook para referenciar el área a imprimir (solo el formulario)
    const printAreaRef = useRef(null);
    const backgroundImage = "/fondoproceso.png";

    // 2. Función para manejar la impresión
    const handlePrint = () => {
        // Usa la función nativa de impresión del navegador
        window.print();
    };

    // 3. Función para manejar el envío (aquí iría la lógica de backend)
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        alert("¡Reclamación enviada con éxito! (Lógica de envío simulada)");
        // Aquí se implementaría la lógica real para enviar los datos a un API
    };

    return (
        <>
            <Navbar />
            
            <div
                className="relative min-h-screen"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Contenedor principal que se puede referenciar para impresión */}
                <div 
                    className="container mx-auto px-4 py-12"
                    ref={printAreaRef} // Referencia al formulario para la impresión
                >
                    
                    {/* Encabezado */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-blue-900 mb-4">LIBRO DE RECLAMACIONES</h1>
                        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                            Sistema oficial para registrar reclamos y quejas sobre nuestros productos y servicios
                        </p>
                    </div>

                    {/* Formulario de Hoja de Reclamación */}
                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 max-w-6xl mx-auto">
                        
                        {/* Encabezado de la tabla */}
                        <div className="grid grid-cols-2 border-b-2 border-blue-900 mb-8 pb-4">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-blue-900">LIBRO DE RECLAMACIONES</h2>
                            </div>
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-blue-900">HOJA DE RECLAMACIÓN</h2>
                            </div>
                        </div>

                        {/* Sección de Fecha - CORREGIDO: labels y mejor usabilidad */}
                        <div className="mb-8 p-4 border border-blue-200 rounded-lg bg-blue-50">
                            <h3 className="text-xl font-bold text-blue-800 mb-4">FECHA</h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="dia" className="block text-sm font-medium text-gray-700 mb-2">Día</label>
                                    <input 
                                        id="dia"
                                        type="number" 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="DD"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="mes" className="block text-sm font-medium text-gray-700 mb-2">Mes</label>
                                    <input 
                                        id="mes"
                                        type="number" 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="MM"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="anio" className="block text-sm font-medium text-gray-700 mb-2">Año</label>
                                    <input 
                                        id="anio"
                                        type="number" 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="AAAA"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 1. IDENTIFICACIÓN DEL CONSUMIDOR RECLAMANTE */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2">
                                1. IDENTIFICACIÓN DEL CONSUMIDOR RECLAMANTE
                            </h3>
                            <div className="space-y-4">
                                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="NOMBRE COMPLETO" required/>
                                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="DOMICILIO" required/>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="DNI / CE" required/>
                                    <input type="email" className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="TELÉFONO / E-MAIL" required/>
                                </div>
                                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="PADRE O MADRE (Si es menor de edad)"/>
                            </div>
                        </div>

                        {/* 2. IDENTIFICACIÓN DEL BIEN CONTRATADO */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2">
                                2. IDENTIFICACIÓN DEL BIEN CONTRATADO
                            </h3>
                            <div className="space-y-4">
                                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="PRODUCTO" required/>
                                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="MONTO RECLAMADO (S/.)"/>
                                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="SERVICIO"/>
                                <textarea 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                                    placeholder="DESCRIPCIÓN del bien o servicio"
                                    required
                                />
                            </div>
                        </div>

                        {/* 3. DETALLE DE LA RECLAMACIÓN Y PEDIDO DEL CONSUMIDOR */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2">
                                3. DETALLE DE LA RECLAMACIÓN Y PEDIDO DEL CONSUMIDOR
                            </h3>
                            <div className="flex space-x-6 mb-4">
                                <label className="inline-flex items-center font-medium text-gray-700">
                                    <input type="radio" name="tipoReclamo" value="reclamo" className="form-radio h-5 w-5 text-blue-600" required/>
                                    <span className="ml-2">RECLAMO ¹</span>
                                </label>
                                <label className="inline-flex items-center font-medium text-gray-700">
                                    <input type="radio" name="tipoReclamo" value="queja" className="form-radio h-5 w-5 text-blue-600"/>
                                    <span className="ml-2">QUEJA ²</span>
                                </label>
                            </div>
                            <textarea 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 mb-4"
                                placeholder="DETALLE del Reclamo/Queja"
                                required
                            />
                            <textarea 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                                placeholder="PEDIDO concreto del Consumidor"
                                required
                            />
                        </div>

                        {/* 4. OBSERVACIONES Y ACCIONES ADOPTADAS POR EL PROVEEDOR (Para uso de la empresa) */}
                        <div className="mb-8 p-4 border border-red-200 rounded-lg bg-red-50">
                            <h3 className="text-xl font-bold text-red-800 mb-4 border-b pb-2">
                                4. OBSERVACIONES Y ACCIONES ADOPTADAS POR EL PROVEEDOR
                            </h3>
                            <textarea 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 h-24 mb-4"
                                placeholder="Respuesta y acciones adoptadas por el proveedor (Uso interno)"
                            />
                            <input 
                                type="text" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
                                placeholder="FECHA DE COMUNICACIÓN DE LA RESPUESTA (Uso interno)"
                            />
                            <div className="border-t border-gray-400 pt-4">
                                <p className="text-center text-lg font-bold text-gray-700">FIRMA DEL PROVEEDOR</p>
                            </div>
                        </div>
                        
                        {/* Leyenda y Notas */}
                        <div className="bg-gray-100 rounded-lg p-6 border border-gray-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                <div>
                                    <p className="text-sm text-gray-700 mb-2">
                                        <span className="font-bold">¹ RECLAMO</span>: Disconformidad relacionada a los productos o servicios.
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-700 mb-2">
                                        <span className="font-bold">² QUEJA</span>: Disconformidad no relacionada a los productos o servicios; malestar o descontento respecto a la atención al público.
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-2 text-xs text-gray-600 border-t pt-4">
                                <p>La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI.</p>
                                <p>El proveedor deberá dar respuesta al reclamo en un plazo no mayor a treinta (30) días calendario, pudiendo ampliar el plazo hasta por treinta (30) días más, previa comunicación al consumidor.</p>
                            </div>
                        </div>

                        {/* Botones de Acción - Funcionalidad agregada */}
                        <div className="flex justify-center space-x-4 mt-8 no-print">
                            <button 
                                type="button" // Cambiado a type="button" para evitar el submit automático
                                onClick={handlePrint}
                                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-200 shadow-md"
                            >
                                Imprimir Formulario
                            </button>
                            <button 
                                type="submit" // Mantenido como type="submit" para activar la función handleSubmit
                                className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition duration-200 shadow-md"
                            >
                                Enviar Reclamación
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
            <Footer />
        </>
    );
};

export default Page;