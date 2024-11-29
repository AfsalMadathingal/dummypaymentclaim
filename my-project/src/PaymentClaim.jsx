import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

const PaymentClaimForm = () => {
  const [location, setLocation] = useState(null);
  const [formData, setFormData] = useState({
    bankName: '',
    ifscCode: '',
    accountNumber: '',
    accountHolderName: '',
    amount: '',
    access_key:"7cee3cc1-f23e-4f87-87f3-4f42dd86edd7"

  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get user's location when component mounts
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          // You would send this to your server
          console.log(`Location: ${latitude}, ${longitude}`);
          setLoading(false);
        },
        (error) => {
          setError("Please enable location access to continue");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newForm = {...formData,location}

    const  formData2 = new FormData()

    for(let key  in newForm){

        if(key == "location"){

            console.log(key);
            

            for(let keyoflocation in location){
                console.log(         );
       
                formData2.append(keyoflocation,location[keyoflocation].toString())
            }

        }else{
            formData2.append(key,newForm[key])

        }
    }


    // Here you would send the data to your server
    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData2
      });
  
  
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">ABF Logistics Payment Claim</h1>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Account Holder Name</label>
              <input
                type="text"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Amount (INR)</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                min="1"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Claim
          </button>
        </form>

        {/* Company Details and Policy */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Company Details</h2>
          <div className="space-y-2 text-gray-600">
            <p>ABF Logistics Pvt. Ltd.</p>
            <p>123 Business Park, Sector 5</p>
            <p>Mumbai, Maharashtra 400001</p>
            <p>GST: 27AABCA1234D1Z5</p>
            <p>Contact: +91 22 1234 5678</p>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 pt-4">Payment Policy</h2>
          <div className="space-y-2 text-gray-600">
            <p>1. All claims will be processed within 7-10 working days</p>
            <p>2. Please ensure all bank details are correctly entered</p>
            <p>3. Claims above ₹50,000 require additional verification</p>
            <p>4. For any queries, please contact our support team</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentClaimForm;