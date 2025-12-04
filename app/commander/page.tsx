/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState } from 'react'

// Types
interface FormData {
  name: string
  phone: string
  address: string
  service: string
  subService: string
  gazQuantite: string
  customFood: string
  comment: string
}

interface ServiceOption {
  value: string
  label: string
  hasSubService?: boolean
}

interface SubServiceOption {
  value: string
  label: string
  hasCustomInput?: boolean
}

// Constants
const SERVICE_OPTIONS: ServiceOption[] = [
  { value: '', label: 'Sélectionnez un service' },
  { value: 'livraison-gaz', label: 'Livraison de gaz domestique', hasSubService: true },
  { value: 'alimentation', label: 'Livraison d\'alimentation', hasSubService: true },
  { value: 'materiaux', label: 'Matériaux de construction', hasSubService: true },
  { value: 'colis', label: 'Livraison de colis', hasSubService: true },
]

const SUB_SERVICE_OPTIONS: Record<string, SubServiceOption[]> = {
  'livraison-gaz': [
    { value: '', label: 'Sélectionnez un type' },
    { value: 'sos-gaz', label: 'SOS Gaz' },
    { value: 'zanzat-gaz', label: 'Zanzat Gaz' },
    { value: 'gani-gaz', label: 'Gani Gaz' },
    { value: 'divers', label: 'Divers' },
  ],
  'alimentation': [
    { value: '', label: 'Sélectionnez un produit' },
    { value: 'riz', label: 'Riz' },
    { value: 'pates', label: 'Pâtes' },
    { value: 'huile', label: 'Huile' },
    { value: 'autre', label: 'Autre (à préciser)', hasCustomInput: true },
  ],
  'materiaux': [
    { value: '', label: 'Sélectionnez un matériau' },
    { value: 'ciment', label: 'Ciment' },
    { value: 'peinture', label: 'Peinture' },
    { value: 'briques', label: 'Briques' },
    { value: 'fer', label: 'Fer' },
    { value: 'divers', label: 'Divers' },
  ],
  'colis': [
    { value: '', label: 'Sélectionnez un type de colis' },
    { value: 'bagages-articles-volumineux', label: 'Bagages et articles volumineux : équipements, valises, etc.' },
    { value: 'colis-standard', label: 'Colis standard : Tout type d\'objet emballé de manière sécurisée (jusqu\'à 30 kg)' },
    { value: 'colis-express', label: 'Colis express : Documents ou colis nécessitant une livraison rapide' },
    { value: 'courrier', label: 'Courrier : Lettres et petits paquets' },
  ],
}

// Components
const FormField: React.FC<{
  label: string
  required?: boolean
  children: React.ReactNode
}> = ({ label, required = false, children }) => (
  <div>
    <label className="block mb-2 text-sm font-medium">
      {label} {required && <span className="text-orange-500">*</span>}
    </label>
    {children}
  </div>
)

const Input: React.FC<{
  type?: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  required?: boolean
  className?: string
}> = ({ type = 'text', name, value, onChange, placeholder, required = false, className = '' }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full p-3 bg-slate-800 rounded-xl border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition ${className}`}
    required={required}
  />
)

const TextArea: React.FC<{
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder: string
  rows?: number
}> = ({ name, value, onChange, placeholder, rows = 4 }) => (
  <textarea
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className="w-full p-3 bg-slate-800 rounded-xl border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition resize-none"
  />
)

const Select: React.FC<{
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: Array<{ value: string; label: string }>
  required?: boolean
}> = ({ name, value, onChange, options, required = false }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    className="w-full p-3 bg-slate-800 rounded-xl border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition"
    required={required}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
)

const SubmitButton: React.FC<{
  loading: boolean
}> = ({ loading }) => (
  <button
    type="submit"
    className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 transition py-3 rounded-full text-lg font-medium shadow-lg"
    disabled={loading}
  >
    {loading ? 'Envoi en cours...' : 'Soumettre la commande'}
  </button>
)

const Message: React.FC<{
  type: 'success' | 'error'
  message: string | null
}> = ({ type, message }) => {
  if (!message) return null
  
  return (
    <p className={`text-center mt-4 ${
      type === 'success' ? 'text-green-500' : 'text-red-500'
    }`}>
      {message}
    </p>
  )
}

// Main Component
const CommanderPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
    service: '',
    subService: '',
    gazQuantite: '',
    customFood: '',
    comment: ''
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    setError(null)
    
    // Map frontend fields to backend fields
    const data = {
      nom_complet: formData.name,
      telephone: formData.phone,
      adresse_livraison: formData.address,
      type_service: formData.service,
      sous_type_service: requiresCustomInput && formData.customFood ? formData.customFood : formData.subService,
      gaz_quantite: formData.gazQuantite,
      commentaire: formData.comment
    }
    
    try {
      const response = await fetch('http://localhost/air-express-backend/api/orders/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const result = await response.json()
      
      if (response.ok && result.success) {
        setMessage('Commande soumise avec succès !')
        setFormData({
          name: '', 
          phone: '', 
          address: '', 
          service: '', 
          subService: '', 
          gazQuantite: '',
          customFood: '', 
          comment: ''
        })
      } else {
        setError(result.message || 'Erreur lors de la soumission de la commande')
      }
    } catch (err) {
      setError('Erreur réseau. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  // Get current sub-service options based on selected service
  const currentSubServiceOptions = formData.service 
    ? SUB_SERVICE_OPTIONS[formData.service] || [] 
    : []

  // Check if current sub-service requires custom input
  const currentSubService = currentSubServiceOptions.find(
    option => option.value === formData.subService
  )
  const requiresCustomInput = currentSubService?.hasCustomInput

  return (
    <section className="min-h-screen py-40 text-white flex justify-center items-center p-6">
      <div className="max-w-2xl w-full bg-slate-900 rounded-2xl shadow-lg p-8 border border-orange-500/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-2 text-orange-500">
            Formulaire de Commande
          </h1>
          <p className="text-gray-400">
            Tous les champs marqués d’un <span className="text-orange-500">*</span> sont obligatoires
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <FormField label="Nom complet" required>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom complet"
                required
              />
            </FormField>

            <FormField label="Téléphone" required>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+227 XX XX XX XX"
                required
              />
            </FormField>

            <FormField label="Adresse de livraison" required>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Votre adresse complète"
                required
              />
            </FormField>
          </div>

          {/* Service Selection Section */}
          <div className="space-y-4">
            <FormField label="Type de service" required>
              <Select
                name="service"
                value={formData.service}
                onChange={handleChange}
                options={SERVICE_OPTIONS}
                required
              />
            </FormField>

            {/* Conditional Sub-Service Selection */}
            {formData.service && SERVICE_OPTIONS.find(s => s.value === formData.service)?.hasSubService && (
              <FormField 
                label={getSubServiceLabel(formData.service)} 
                required
              >
                <Select
                  name="subService"
                  value={formData.subService}
                  onChange={handleChange}
                  options={currentSubServiceOptions}
                  required
                />
              </FormField>
            )}

            {/* Quantité de gaz if livraison-gaz */}
            {formData.service === 'livraison-gaz' && (
              <FormField label="Quantité de gaz" required>
                <Input
                  name="gazQuantite"
                  value={formData.gazQuantite}
                  onChange={handleChange}
                  placeholder="Ex: 1 bouteille, 6kg, etc."
                  required
                />
              </FormField>
            )}

            {/* Conditional Custom Input */}
            {requiresCustomInput && (
              <FormField label="Précisez le produit" required>
                <Input
                  name="customFood"
                  value={formData.customFood}
                  onChange={handleChange}
                  placeholder="Décrivez le produit souhaité..."
                  required
                />
              </FormField>
            )}
          </div>

          {/* Additional Information */}
          <FormField label="Commentaire (optionnel)">
            <TextArea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Détails supplémentaires sur votre commande..."
            />
          </FormField>

          {/* Submit Section */}
          <SubmitButton loading={loading} />

          {/* Messages */}
          <Message type="success" message={message} />
          <Message type="error" message={error} />
        </form>
      </div>
    </section>
  )
}

// Helper function to get appropriate sub-service label
const getSubServiceLabel = (service: string): string => {
  const labels: Record<string, string> = {
    'livraison-gaz': 'Type de gaz',
    'alimentation': 'Type d\'aliment',
    'materiaux': 'Type de matériau',
    'colis': 'Type de colis'
  }
  return labels[service] || 'Sous-type de service'
}

export default CommanderPage