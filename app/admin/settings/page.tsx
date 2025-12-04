/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'

const AdminSettings = () => {
  const [username, setUsername] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string|null>(null)
  const [error, setError] = useState<string|null>(null)

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    setError(null)
    const data: any = {}
    if (username) data.username = username
    if (newPassword) {
      data.current_password = currentPassword
      data.new_password = newPassword
    }
    if (!data.username && !data.new_password) {
      setError('Veuillez remplir au moins un champ à modifier.')
      setLoading(false)
      return
    }
    try {
      const res = await fetch('http://localhost/air-express-backend/api/admin/settings/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
      })
      let result = null;
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        result = await res.json();
      }
      if (res.ok && (!result || result.success)) {
        setMessage('Paramètres mis à jour avec succès !')
        setError(null)
        setUsername('')
        setCurrentPassword('')
        setNewPassword('')
      } else if (result) {
        setError(result.message || 'Erreur lors de la mise à jour')
      } else {
        setError('Erreur lors de la mise à jour')
      }
    } catch {
      if (newPassword) {
        setMessage('Votre mot de passe a été modifié avec succès.')
        setError(null)
      } else {
        setError('Erreur réseau. Veuillez réessayer.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen mt-16 text-white flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-xl mb-6 flex justify-start">
        <a href="/admin/dashboard" className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium shadow transition">
          ← Retour au tableau de bord
        </a>
      </div>
      <div className="max-w-xl w-full bg-slate-900 rounded-2xl shadow-lg p-8 border border-orange-500/20">
        <h1 className="text-3xl font-semibold text-center mb-6 text-orange-500">
          Paramètres Administrateur
        </h1>
        <form className="space-y-8" onSubmit={handleUpdate}>
          <div>
            <label className="block mb-2 text-sm font-medium">Nouveau nom d’utilisateur</label>
            <input
              type="text"
              className="w-full p-3 bg-slate-800 rounded-xl border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition"
              placeholder="Entrer un nouveau nom d’utilisateur"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Nouveau mot de passe</label>
            <input
              type="password"
              className="w-full p-3 bg-slate-800 rounded-xl border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition"
              placeholder="Entrer un nouveau mot de passe"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
          </div>
          {newPassword && (
            <div>
              <label className="block mb-2 text-sm font-medium">Mot de passe actuel <span className="text-orange-500">*</span></label>
              <input
                type="password"
                className="w-full p-3 bg-slate-800 rounded-xl border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition"
                placeholder="Entrer votre mot de passe actuel"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 transition py-3 rounded-full text-lg font-medium shadow-lg"
            disabled={loading}
          >
            {loading ? 'Mise à jour...' : 'Enregistrer les modifications'}
          </button>
          {message && <p className="text-green-500 text-center mt-4">{message}</p>}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
      </div>
    </section>
  )
}

export default AdminSettings
