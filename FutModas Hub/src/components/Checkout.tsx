import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Check, CreditCard, QrCode, Receipt, Truck } from 'lucide-react';

type CheckoutStep = 'shipping' | 'payment' | 'confirmation';
type PaymentMethod = 'credit' | 'pix' | 'boleto' | 'paypal';

export default function Checkout() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    installments: '1',
  });
  const [orderComplete, setOrderComplete] = useState(false);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0);
  const shipping = 15.99;
  const total = subtotal + shipping;

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Move to next step
  const nextStep = () => {
    if (currentStep === 'shipping') setCurrentStep('payment');
    else if (currentStep === 'payment') setCurrentStep('confirmation');
  };

  // Move to previous step
  const prevStep = () => {
    if (currentStep === 'payment') setCurrentStep('shipping');
    else if (currentStep === 'confirmation') setCurrentStep('payment');
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 'confirmation') {
      // Simulate order processing
      setOrderComplete(true);
      
      // Clear cart after successful order
      setTimeout(() => {
        clearCart();
      }, 500);
    } else {
      nextStep();
    }
  };

  // If cart is empty, redirect to cart page
  if (items.length === 0 && !orderComplete) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h2>
        <p className="text-gray-400 mb-6">Adicione alguns produtos antes de finalizar a compra</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Voltar para a loja
        </button>
      </div>
    );
  }

  // Show order complete screen
  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="flex justify-center mb-6">
          <Check className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Pedido Concluído!</h1>
        <p className="text-xl mb-8 text-gray-300">Obrigado por sua compra!</p>
        <p className="mb-6 text-gray-400">
          Você receberá um e-mail com os detalhes do seu pedido em breve.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Continuar Comprando
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-400 hover:text-blue-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-8">Finalizar Compra</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main checkout form */}
        <div className="md:col-span-2">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-700 -z-10"></div>
              
              <div className={`flex flex-col items-center ${currentStep === 'shipping' ? 'text-blue-500' : 'text-green-500'}`}>
                <div className={`w-8 h-8 rounded-full ${currentStep === 'shipping' ? 'bg-blue-500' : 'bg-green-500'} flex items-center justify-center text-white`}>
                  1
                </div>
                <span className="text-sm mt-1">Entrega</span>
              </div>
              
              <div className={`flex flex-col items-center ${currentStep === 'payment' ? 'text-blue-500' : currentStep === 'confirmation' || currentStep === 'complete' ? 'text-green-500' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 rounded-full ${currentStep === 'payment' ? 'bg-blue-500' : currentStep === 'confirmation' || currentStep === 'complete' ? 'bg-green-500' : 'bg-gray-700'} flex items-center justify-center text-white`}>
                  2
                </div>
                <span className="text-sm mt-1">Pagamento</span>
              </div>
              
              <div className={`flex flex-col items-center ${currentStep === 'confirmation' ? 'text-blue-500' : currentStep === 'complete' ? 'text-green-500' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 rounded-full ${currentStep === 'confirmation' ? 'bg-blue-500' : currentStep === 'complete' ? 'bg-green-500' : 'bg-gray-700'} flex items-center justify-center text-white`}>
                  3
                </div>
                <span className="text-sm mt-1">Confirmação</span>
              </div>
            </div>
          </div>

          {/* Checkout steps */}
          <form onSubmit={handleSubmit}>
            {/* Step 1: Shipping Information */}
            {currentStep === 'shipping' && (
              <div className="bg-gray-900 rounded-lg p-6 mb-4">
                <div className="flex items-center gap-2 mb-6">
                  <Truck className="h-5 w-5 text-blue-400" />
                  <h2 className="text-xl font-semibold">Informações de Entrega</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="fullName">
                        Nome completo *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="email">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="address">
                      Endereço *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium mb-1" htmlFor="city">
                        Cidade *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="state">
                        Estado *
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="zipCode">
                        CEP *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 'payment' && (
              <div className="bg-gray-900 rounded-lg p-6 mb-4">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="h-5 w-5 text-blue-400" />
                  <h2 className="text-xl font-semibold">Forma de Pagamento</h2>
                </div>
                
                <div className="mb-6">
                  <div className="flex flex-wrap gap-4">
                    <button 
                      type="button" 
                      onClick={() => setPaymentMethod('credit')}
                      className={`px-4 py-3 rounded-lg flex items-center gap-2 ${
                        paymentMethod === 'credit' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-800 text-gray-300'
                      }`}
                    >
                      <CreditCard className="h-5 w-5" />
                      <span>Cartão de Crédito</span>
                    </button>
                    
                    <button 
                      type="button" 
                      onClick={() => setPaymentMethod('pix')}
                      className={`px-4 py-3 rounded-lg flex items-center gap-2 ${
                        paymentMethod === 'pix' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-800 text-gray-300'
                      }`}
                    >
                      <QrCode className="h-5 w-5" />
                      <span>PIX</span>
                    </button>
                    
                    <button 
                      type="button" 
                      onClick={() => setPaymentMethod('boleto')}
                      className={`px-4 py-3 rounded-lg flex items-center gap-2 ${
                        paymentMethod === 'boleto' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-800 text-gray-300'
                      }`}
                    >
                      <Receipt className="h-5 w-5" />
                      <span>Boleto</span>
                    </button>
                  </div>
                </div>
                
                {paymentMethod === 'credit' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="cardNumber">
                        Número do Cartão *
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                        placeholder="0000 0000 0000 0000"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="cardName">
                        Nome no Cartão *
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="expiryDate">
                          Data de Expiração *
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          required
                          placeholder="MM/AA"
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="cvv">
                          CVV *
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          required
                          placeholder="123"
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="installments">
                        Parcelamento
                      </label>
                      <select
                        id="installments"
                        name="installments"
                        value={formData.installments}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="1">À vista - R$ {total.toFixed(2)}</option>
                        <option value="2">2x de R$ {(total / 2).toFixed(2)}</option>
                        <option value="3">3x de R$ {(total / 3).toFixed(2)}</option>
                        <option value="4">4x de R$ {(total / 4).toFixed(2)}</option>
                        <option value="5">5x de R$ {(total / 5).toFixed(2)}</option>
                        <option value="6">6x de R$ {(total / 6).toFixed(2)}</option>
                        <option value="12">12x de R$ {(total / 12 * 1.15).toFixed(2)} (com juros)</option>
                      </select>
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'pix' && (
                  <div className="text-center py-6">
                    <div className="bg-white p-4 w-48 h-48 mx-auto mb-4 rounded-md">
                      <QrCode className="h-full w-full text-black" />
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      Escaneie o QR Code acima com o aplicativo do seu banco
                    </p>
                    <p className="bg-gray-800 p-2 rounded-md text-gray-300 font-mono text-sm">
                      00020126580014br.gov.bcb.pix0136a629534e-7368-4ea5-8f3c-dc2036464032520400005303986540599.995802BR5925FutModas Ltda6008Sao Paulo62070503***63047B5D
                    </p>
                  </div>
                )}
                
                {paymentMethod === 'boleto' && (
                  <div className="text-center py-6">
                    <Receipt className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="mb-6">
                      Um boleto será gerado após a confirmação do pedido.
                    </p>
                    <p className="bg-gray-800 p-2 rounded-md text-gray-300 font-mono text-sm">
                      34191.79001 01043.510047 91020.150008 8 91250026000
                    </p>
                    <p className="text-sm text-gray-500 mt-2">Vencimento: 3 dias após a emissão</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 'confirmation' && (
              <div className="bg-gray-900 rounded-lg p-6 mb-4">
                <div className="flex items-center gap-2 mb-6">
                  <Check className="h-5 w-5 text-blue-400" />
                  <h2 className="text-xl font-semibold">Confirmar Pedido</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Endereço de Entrega</h3>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <p>{formData.fullName}</p>
                      <p>{formData.address}</p>
                      <p>{formData.city}, {formData.state} - {formData.zipCode}</p>
                      <p className="text-gray-400">{formData.email}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Forma de Pagamento</h3>
                    <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-3">
                      {paymentMethod === 'credit' && (
                        <>
                          <CreditCard className="h-5 w-5 text-blue-400" />
                          <div>
                            <p>Cartão de Crédito</p>
                            <p className="text-gray-400">**** **** **** {formData.cardNumber.slice(-4)}</p>
                            <p className="text-gray-400">
                              {formData.installments === '1' 
                                ? 'Pagamento à vista' 
                                : `${formData.installments}x de R$ ${(total / parseInt(formData.installments)).toFixed(2)}`}
                            </p>
                          </div>
                        </>
                      )}
                      
                      {paymentMethod === 'pix' && (
                        <>
                          <QrCode className="h-5 w-5 text-blue-400" />
                          <div>
                            <p>Pagamento via PIX</p>
                            <p className="text-gray-400">Pagamento à vista</p>
                          </div>
                        </>
                      )}
                      
                      {paymentMethod === 'boleto' && (
                        <>
                          <Receipt className="h-5 w-5 text-blue-400" />
                          <div>
                            <p>Pagamento via Boleto</p>
                            <p className="text-gray-400">Vencimento em 3 dias</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Items</h3>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      {items.map(item => (
                        <div key={item.id} className="flex justify-between py-2 border-b border-gray-700 last:border-0">
                          <div className="flex items-center gap-3">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-12 h-12 rounded object-cover"
                            />
                            <div>
                              <p>{item.name}</p>
                              <p className="text-sm text-gray-400">Quantidade: {item.quantity}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              R$ {((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
              {currentStep !== 'shipping' && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                >
                  Voltar
                </button>
              )}

              <button
                type="submit"
                className={`px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ${
                  currentStep !== 'shipping' ? 'ml-auto' : 'w-full'
                }`}
              >
                {currentStep === 'confirmation' ? 'Finalizar Compra' : 'Continuar'}
              </button>
            </div>
          </form>
        </div>

        {/* Order summary */}
        <div className="md:col-span-1">
          <div className="bg-gray-900 rounded-lg p-6 sticky top-4">
            <h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>
            
            <div className="space-y-3 mb-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-3">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-400">Qtd: {item.quantity}</p>
                    <p className="text-sm">
                      R$ {((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-700 pt-4 mb-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Frete</span>
                <span>R$ {shipping.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="text-sm text-gray-400">
              <p>Prazo de entrega estimado: 5-7 dias úteis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
