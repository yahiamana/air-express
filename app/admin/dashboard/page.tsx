/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState, useMemo } from 'react'
import Link from 'next/link'

interface Order {
  id: number
  name: string
  phone: string
  address: string
  service: string
  sousType?: string
  gazQuantite?: string
  date_commande?: string
  commentaire?: string
  status: 'En attente' | 'confirmée' | 'annulée' | 'expédiée' | 'retour'
}

// Helper function to format text with 40 character limit and line breaks
const formatText = (text: string | undefined, maxLength: number = 40): string => {
  if (!text || text === '-') return '-'
  
  if (text.length <= maxLength) return text
  
  const chunks = []
  for (let i = 0; i < text.length; i += maxLength) {
    chunks.push(text.substring(i, i + maxLength))
  }
  
  return chunks.join('\n')
}

// Helper function to format comment with 3 words per line
const formatComment = (comment: string | undefined): string => {
  if (!comment) return '-'
  
  const words = comment.split(/\s+/).filter(word => word.length > 0)
  const lines = []
  
  for (let i = 0; i < words.length; i += 3) {
    const line = words.slice(i, i + 3).join(' ')
    if (line.length > 40) {
      const subChunks = []
      for (let j = 0; j < line.length; j += 40) {
        subChunks.push(line.substring(j, j + 40))
      }
      lines.push(...subChunks)
    } else {
      lines.push(line)
    }
  }
  
  return lines.join('\n')
}

// Status Badge Component
const StatusBadge = ({ status }: { status: Order['status'] }) => {
  const getStatusConfig = (status: string) => {
    const config = {
      'En attente': { color: 'text-orange-500 bg-orange-500/10 border-orange-500/30', label: 'En attente' },
      'confirmée': { color: 'text-green-500 bg-green-500/10 border-green-500/30', label: 'Confirmée' },
      'annulée': { color: 'text-red-500 bg-red-500/10 border-red-500/30', label: 'Annulée' },
      'expédiée': { color: 'text-blue-500 bg-blue-500/10 border-blue-500/30', label: 'Expédiée' },
      'retour': { color: 'text-purple-500 bg-purple-500/10 border-purple-500/30', label: 'Retour' },
    }
    return config[status as keyof typeof config] || config['En attente']
  }

  const { color, label } = getStatusConfig(status)

  return (
    <span className={`px-3 py-1 rounded-full border text-xs font-medium ${color}`}>
      {label}
    </span>
  )
}

// Filter Buttons Component - FIXED: Added proper status mapping
const FilterButtons = ({ filter, setFilter }: { filter: string; setFilter: (filter: string) => void }) => {
  const filters = [
    { key: 'toutes', label: 'Toutes' },
    { key: 'En attente', label: 'En attente' }, // Make sure this matches exactly with the status in your data
    { key: 'confirmée', label: 'Confirmées' },
    { key: 'expédiée', label: 'Expédiées' },
    { key: 'annulée', label: 'Annulées' },
    { key: 'retour', label: 'Retours' },
  ]

  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setFilter(key)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
            filter === key
              ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/25'
              : 'bg-slate-800 border-gray-700 hover:border-orange-500 hover:text-orange-400 hover:bg-slate-700'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

// Text Cell Component for consistent formatting
const TextCell = ({ text, title, className = "" }: { text: string | undefined, title?: string, className?: string }) => {
  const formattedText = text ? formatText(text, 40) : '-'
  
  return (
    <div 
      className={`text-sm leading-5 max-h-20 overflow-y-auto whitespace-pre-line wrap-break-word ${className}`}
      title={title || text}
    >
      {formattedText}
    </div>
  )
}

// Order Row Component
const OrderRow = ({ 
  order, 
  onStatusChange, 
  onDelete 
}: { 
  order: Order
  onStatusChange: (id: number, status: Order['status']) => void
  onDelete: (id: number) => void 
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la commande #${order.id} ?`)) {
      setIsDeleting(true)
      await onDelete(order.id)
      setIsDeleting(false)
    }
  }

  const formattedComment = formatComment(order.commentaire)

  return (
    <tr className="border-b border-gray-700 hover:bg-slate-800/60 transition-all duration-200 group">
      <td className="p-3">
        <div className="text-gray-400 font-mono text-sm">
          #{order.id}
        </div>
      </td>
      <td className="p-3">
        <TextCell text={order.name} />
      </td>
      <td className="p-3">
        <a 
          href={`tel:${order.phone}`} 
          className="text-orange-400 hover:text-orange-300 transition-colors whitespace-pre-line wrap-break-word"
          title={order.phone}
        >
          {formatText(order.phone, 40)}
        </a>
      </td>
      <td className="p-3">
        <TextCell text={order.address} />
      </td>
      <td className="p-3">
        <div className="bg-slate-700 px-2 py-1 rounded text-sm whitespace-pre-line wrap-break-word">
          {formatText(order.service, 40)}
        </div>
      </td>
      <td className="p-3">
        <TextCell text={order.sousType} className="text-gray-400" />
      </td>
      <td className="p-3">
        {order.gazQuantite ? (
          <div className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-sm text-center whitespace-pre-line wrap-break-word">
            {formatText(order.gazQuantite, 40)}
          </div>
        ) : (
          <div className="text-gray-500">-</div>
        )}
      </td>
      <td className="p-3">
        <div className="text-sm text-gray-400 whitespace-pre-line wrap-break-word">
          {order.date_commande ? 
            formatText(
              new Date(order.date_commande).toLocaleDateString('fr-FR', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }), 
              40
            ) 
            : '-'
          }
        </div>
      </td>
      <td className="p-3">
        <div 
          className="text-sm leading-5 max-h-20 overflow-y-auto whitespace-pre-line wrap-break-word"
          title={order.commentaire}
        >
          {formattedComment}
        </div>
      </td>
      <td className="p-3">
        <StatusBadge status={order.status} />
      </td>
      <td className="p-3">
        <select
          value={order.status}
          onChange={(e) => onStatusChange(order.id, e.target.value as Order['status'])}
          className="bg-slate-800 border border-gray-700 rounded-lg px-2 py-1 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition-all w-full min-w-[120px]"
        >
          <option value="En attente">En attente</option>
          <option value="confirmée">Confirmée</option>
          <option value="expédiée">Expédiée</option>
          <option value="annulée">Annulée</option>
          <option value="retour">Retour</option>
        </select>
      </td>
      <td className="p-3">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group-hover:bg-red-500/5"
          title="Supprimer la commande"
        >
          {isDeleting ? (
            <div className="w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h2a2 2 0 012 2v2" />
            </svg>
          )}
        </button>
      </td>
    </tr>
  )
}

// Loading Skeleton Component
const LoadingSkeleton = () => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <tr key={index} className="border-b border-gray-700 animate-pulse">
          {Array.from({ length: 12 }).map((_, cellIndex) => (
            <td key={cellIndex} className="p-3">
              <div className="h-4 bg-gray-700 rounded"></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

const AdminOrdersPage = () => {
  const [filter, setFilter] = useState('toutes')
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch orders
  React.useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('http://localhost/air-express-backend/api/admin/orders/', {
          method: 'GET',
          credentials: 'include'
        })
        if (res.status === 401) {
          window.location.href = '/admin/signin'
          return
        }
        const data = await res.json()
        if (res.ok && data.success) {
          const fetchedOrders = data.data.orders.map((o: any) => ({
            id: o.id,
            name: o.nom_complet,
            phone: o.telephone,
            address: o.adresse_livraison,
            service: o.type_service,
            sousType: o.sous_type_service,
            gazQuantite: o.gaz_quantite,
            date_commande: o.date_commande,
            commentaire: o.commentaire,
            status: typeof o.statut === 'string' ? o.statut.trim() : o.statut
          }))
          setOrders(fetchedOrders)
        } else {
          setError(data.message || 'Erreur lors du chargement des commandes')
        }
      } catch (err) {
        setError('Erreur réseau. Veuillez réessayer.')
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  // Delete order function
  const handleDeleteOrder = async (id: number) => {
    try {
      const res = await fetch(`http://localhost/air-express-backend/api/admin/orders/?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (res.ok) {
        setOrders(orders => orders.filter(order => order.id !== id))
      } else {
        alert('Erreur lors de la suppression de la commande.')
      }
    } catch {
      alert('Erreur réseau lors de la suppression.')
    }
  }

  // Update order status function
  const updateOrderStatus = async (id: number, statut: Order['status']) => {
    try {
      const res = await fetch('http://localhost/air-express-backend/api/admin/orders/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id, statut })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setOrders(orders => orders.map(order => order.id === id ? { ...order, status: statut } : order))
      } else if (res.status === 401) {
        window.location.href = '/admin/(auth)/signin'
      } else {
        setError(data.message || 'Erreur lors de la mise à jour du statut')
      }
    } catch (err) {
      setError('Erreur réseau lors de la mise à jour du statut.')
    }
  }

  // Filter orders - FIXED: Added proper status normalization
  const filteredOrders = useMemo(() => {
    if (filter === 'toutes') return orders
    
    // Normalize the filter to handle any potential whitespace issues
    const normalizedFilter = filter.trim()
    return orders.filter((order) => {
      const normalizedStatus = (order.status && order.status.trim()) || 'En attente';
      return normalizedStatus === normalizedFilter;
    })
  }, [filter, orders])

  // Stats
  const orderStats = useMemo(() => ({
    total: orders.length,
    pending: orders.filter(o => (o.status && o.status.trim()) === 'En attente' || !o.status || o.status.trim() === '').length,
    confirmed: orders.filter(o => o.status === 'confirmée').length,
    shipped: orders.filter(o => o.status === 'expédiée').length,
    cancelled: orders.filter(o => o.status === 'annulée').length,
    returned: orders.filter(o => o.status === 'retour').length,
  }), [orders])

  return (
    <section className="min-h-screen py-24 bg-linear-to-br from-slate-900 to-slate-800 mt-16 text-white flex flex-col items-center p-4">
      <div className="w-full max-w-[95vw] bg-slate-900/90 backdrop-blur-sm rounded-2xl shadow-2xl p-4 lg:p-6 border border-orange-500/30">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl lg:text-3xl font-bold bg-linear-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Gestion des Commandes
            </h1>
            <p className="text-gray-400 text-sm lg:text-base mt-1">
              Gérez et suivez toutes les commandes de vos clients
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/admin/settings">
              <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-full shadow-lg hover:shadow-orange-500/25 transition-all duration-300 text-sm">
                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 01.33 1.82 2 2 0 01-2.18 1.17 1.65 1.65 0 01-1.26-.82 1.65 1.65 0 00-2.94 0 1.65 1.65 0 01-1.26.82 2 2 0 01-2.18-1.17A1.65 1.65 0 014.6 15a2 2 0 010-2.12A1.65 1.65 0 015.86 11a1.65 1.65 0 00.82-1.26 2 2 0 011.17-2.18A1.65 1.65 0 019 4.6a2 2 0 012.12 0A1.65 1.65 0 0113 5.86a1.65 1.65 0 001.26.82 2 2 0 012.18-1.17A1.65 1.65 0 0119.4 9a2 2 0 010 2.12z"></path>
                </svg>
                <span className="hidden sm:inline">Paramètres</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="bg-slate-800/50 rounded-lg p-3 text-center border border-gray-700">
            <div className="text-xl lg:text-2xl font-bold text-white">{orderStats.total}</div>
            <div className="text-gray-400 text-xs lg:text-sm">Total</div>
          </div>
          <div className="bg-orange-500/10 rounded-lg p-3 text-center border border-orange-500/30">
            <div className="text-xl lg:text-2xl font-bold text-orange-500">{orderStats.pending}</div>
            <div className="text-orange-400 text-xs lg:text-sm">En attente</div>
          </div>
          <div className="bg-green-500/10 rounded-lg p-3 text-center border border-green-500/30">
            <div className="text-xl lg:text-2xl font-bold text-green-500">{orderStats.confirmed}</div>
            <div className="text-green-400 text-xs lg:text-sm">Confirmées</div>
          </div>
          <div className="bg-blue-500/10 rounded-lg p-3 text-center border border-blue-500/30">
            <div className="text-xl lg:text-2xl font-bold text-blue-500">{orderStats.shipped}</div>
            <div className="text-blue-400 text-xs lg:text-sm">Expédiées</div>
          </div>
          <div className="bg-red-500/10 rounded-lg p-3 text-center border border-red-500/30">
            <div className="text-xl lg:text-2xl font-bold text-red-500">{orderStats.cancelled}</div>
            <div className="text-red-400 text-xs lg:text-sm">Annulées</div>
          </div>
          <div className="bg-purple-500/10 rounded-lg p-3 text-center border border-purple-500/30">
            <div className="text-xl lg:text-2xl font-bold text-purple-500">{orderStats.returned}</div>
            <div className="text-purple-400 text-xs lg:text-sm">Retours</div>
          </div>
        </div>

        {/* Filters */}
        <FilterButtons filter={filter} setFilter={setFilter} />

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-6">
            <div className="inline-flex items-center gap-2 text-orange-500">
              <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
              Chargement des commandes...
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center mb-4">
            <p className="text-red-400">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 text-red-400 hover:text-red-300 underline text-sm"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Orders Table - Full Width */}
        <div className="bg-slate-800/30 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left min-w-[1200px]">
              <thead>
                <tr className="border-b border-gray-700 bg-slate-800/50 sticky top-0 z-10">
                  <th className="p-3 text-gray-400 font-semibold text-sm min-w-[60px]">ID</th>
                  <th className="p-3 text-gray-400 font-semibold text-sm min-w-[120px]">Client</th>
                  <th className="p-3 text-gray-400 font-semibold text-sm min-w-[100px]">Téléphone</th>
                  <th className="p-3 text-gray-400 font-semibold text-sm min-w-[150px]">Adresse</th>
                  <th className="p-3 text-gray-400 font-semibold text-sm min-w-[120px]">Service</th>
                  <th className="p-3 text-gray-400 font-semibold text-sm min-w-[100px]">Sous-type</th>
                  <th className="p-3 text-gray-400 font-semibold text-sm min-w-20">Quantité</th>
                  <th className="p-3 text-gray-400 font-semibold text-sm min-w-[120px]">Date</th>
                  <th className="p-3 text-gray-400 font-semibold text-sm min-w-[150px]">Commentaire</th>
                  <th className="p-3 text-gray-400 font-semibold text-sm min-w-[100px]">Statut</th>
                  <th className="p-3 text-gray-400 font-semibold text-sm min-w-[120px]">Action</th>
                  <th className="p-3 text-gray-400 font-semibold text-sm min-w-[60px]"></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <LoadingSkeleton />
                ) : filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <OrderRow
                      key={order.id}
                      order={order}
                      onStatusChange={updateOrderStatus}
                      onDelete={handleDeleteOrder}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={12} className="p-8 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-6V4m0 3a3 3 0 01-3 3 3 3 0 01-3-3m6 0a3 3 0 01-3 3 3 3 0 01-3-3" />
                        </svg>
                        <p>Aucune commande trouvée pour ce statut.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-4 text-center text-gray-500 text-sm">
          {filteredOrders.length > 0 && (
            <p>
              Affichage de <span className="text-orange-400 font-semibold">{filteredOrders.length}</span> commande{filteredOrders.length > 1 ? 's' : ''}
              {filter !== 'toutes' && ` (${orderStats.total} au total)`}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default AdminOrdersPage