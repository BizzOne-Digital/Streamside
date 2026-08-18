import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck } from 'react-icons/fi';
import { serviceAPI } from '../../utils/api';
import { toast } from 'react-toastify';
import styles from './AdminPage.module.css';

const empty = { name:'', tagline:'', description:'', price:'', priceNote:'/month + applicable taxes', badge:'', featured:false, features:[''], type:'plan', ctaText:'Book a Free Bookkeeping Fit Call', published:true, order:0 };

export default function ServicesAdminPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const load = async () => { setLoading(true); try { const r = await serviceAPI.getAll(); setServices(r.data.services || []); } catch { toast.error('Failed to load'); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm(empty); setModal(true); };
  const openEdit = (s) => { setEditing(s); setForm({ ...s, features: s.features || [''] }); setModal(true); };
  const close = () => { setModal(false); setEditing(null); };

  const setFeature = (i, v) => setForm(f => ({ ...f, features: f.features.map((x, idx) => idx === i ? v : x) }));
  const addFeature = () => setForm(f => ({ ...f, features: [...f.features, ''] }));
  const removeFeature = (i) => setForm(f => ({ ...f, features: f.features.filter((_, idx) => idx !== i) }));

  const handleSave = async () => {
    if (!form.name || !form.price) return toast.error('Name and price are required');
    setSaving(true);
    try {
      const data = { ...form, features: form.features.filter(f => f.trim()) };
      if (editing) { await serviceAPI.update(editing._id, data); toast.success('Service updated'); }
      else { await serviceAPI.create(data); toast.success('Service created'); }
      close(); load();
    } catch (e) { toast.error(e.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this service?')) return;
    try { await serviceAPI.delete(id); toast.success('Deleted'); setServices(s => s.filter(x => x._id !== id)); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div><h1 className={styles.pageTitle}>Services & Pricing</h1><p className={styles.pageSub}>{services.length} service plans</p></div>
        <button className="btn btn-primary" onClick={openNew}><FiPlus size={16}/> Add Service Plan</button>
      </div>

      {loading ? <div className={styles.empty}>Loading...</div> : (
        <div className={styles.grid}>
          {services.map(s => (
            <div key={s._id} className={styles.card}>
              <div className={styles.cardBody}>
                {s.badge && <div style={{ display:'inline-block', background:'var(--green)', color:'#fff', fontSize:'0.62rem', fontWeight:700, fontFamily:'var(--font-heading)', padding:'3px 10px', borderRadius:'50px', marginBottom:8, letterSpacing:'0.08em' }}>{s.badge}</div>}
                <div className={styles.cardTitle}>{s.name}</div>
                <div className={styles.cardPrice}>{s.price}</div>
                <div className={styles.cardSub}>{s.priceNote}</div>
                <div style={{ fontSize:'0.82rem', color:'var(--grey-text)', marginTop:6 }}>{s.tagline}</div>
                {(s.features || []).slice(0,4).map(f => <div key={f} style={{ display:'flex', gap:6, fontSize:'0.78rem', alignItems:'flex-start' }}><FiCheck size={12} style={{ color:'var(--green)', flexShrink:0, marginTop:2 }}/> {f}</div>)}
                {(s.features?.length || 0) > 4 && <div style={{ fontSize:'0.75rem', color:'var(--grey-text)' }}>+{s.features.length - 4} more</div>}
              </div>
              <div className={styles.cardActions}>
                <button className={`btn btn-outline-dark btn-sm ${styles.editBtn}`} onClick={() => openEdit(s)}><FiEdit2 size={14}/> Edit</button>
                <button className="btn btn-sm" style={{ background:'#FFF5F5', color:'#E53E3E', border:'1px solid #FC8181' }} onClick={() => handleDelete(s._id)}><FiTrash2 size={14}/></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{editing ? 'Edit Service Plan' : 'Add Service Plan'}</h3>
              <button onClick={close} className={styles.closeBtn}><FiX size={18}/></button>
            </div>
            <div className={styles.modalBody}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 16px' }}>
                <div className="form-group"><label className="form-label">Name *</label><input className="form-input" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} /></div>
                <div className="form-group"><label className="form-label">Type</label><select className="form-input" value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}><option value="plan">Plan</option><option value="rescue">Rescue</option><option value="addon">Add-on</option></select></div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 16px' }}>
                <div className="form-group"><label className="form-label">Price *</label><input className="form-input" value={form.price} onChange={e=>setForm(f=>({...f,price:e.target.value}))} placeholder="$345" /></div>
                <div className="form-group"><label className="form-label">Price Note</label><input className="form-input" value={form.priceNote} onChange={e=>setForm(f=>({...f,priceNote:e.target.value}))} /></div>
              </div>
              <div className="form-group"><label className="form-label">Tagline</label><input className="form-input" value={form.tagline} onChange={e=>setForm(f=>({...f,tagline:e.target.value}))} /></div>
              <div className="form-group"><label className="form-label">Description</label><textarea className="form-input" rows={3} value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} style={{ resize:'vertical' }} /></div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 16px' }}>
                <div className="form-group"><label className="form-label">Badge Text</label><input className="form-input" value={form.badge} onChange={e=>setForm(f=>({...f,badge:e.target.value}))} placeholder="MOST POPULAR" /></div>
                <div className="form-group"><label className="form-label">Display Order</label><input className="form-input" type="number" value={form.order} onChange={e=>setForm(f=>({...f,order:Number(e.target.value)}))} /></div>
              </div>
              <div className="form-group">
                <label className="form-label">Features</label>
                {form.features.map((feat, i) => (
                  <div key={i} style={{ display:'flex', gap:6, marginBottom:6 }}>
                    <input className="form-input" value={feat} onChange={e=>setFeature(i, e.target.value)} placeholder={`Feature ${i+1}`} />
                    <button onClick={() => removeFeature(i)} style={{ padding:'0 10px', background:'none', border:'1px solid var(--grey-mid)', borderRadius:6, color:'var(--grey-text)', cursor:'pointer' }}><FiX size={14}/></button>
                  </div>
                ))}
                <button onClick={addFeature} className="btn btn-outline-dark btn-sm" style={{ marginTop:4 }}><FiPlus size={13}/> Add Feature</button>
              </div>
              <div style={{ display:'flex', gap:20 }}>
                <label style={{ display:'flex', alignItems:'center', gap:8, fontSize:'0.9rem', cursor:'pointer' }}>
                  <input type="checkbox" checked={form.featured} onChange={e=>setForm(f=>({...f,featured:e.target.checked}))} style={{ accentColor:'var(--green)' }} /> Featured (Most Popular)
                </label>
                <label style={{ display:'flex', alignItems:'center', gap:8, fontSize:'0.9rem', cursor:'pointer' }}>
                  <input type="checkbox" checked={form.published} onChange={e=>setForm(f=>({...f,published:e.target.checked}))} style={{ accentColor:'var(--green)' }} /> Published
                </label>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button onClick={close} className="btn btn-outline-dark">Cancel</button>
              <button onClick={handleSave} className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : editing ? 'Update Service' : 'Create Service'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
