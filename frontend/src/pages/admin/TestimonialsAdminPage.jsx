import { useState, useEffect, useRef } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiStar, FiUpload } from 'react-icons/fi';
import { testimonialAPI, uploadAPI } from '../../utils/api';
import { toast } from 'react-toastify';
import styles from './AdminPage.module.css';

const empty = { name:'', businessName:'', businessType:'', location:'Vancouver Island, BC', quote:'', rating:5, avatarUrl:'', featured:false, published:true, order:0 };

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const load = async () => { setLoading(true); try { const r = await testimonialAPI.getAll(); setItems(r.data.testimonials || []); } catch { toast.error('Failed'); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm(empty); setModal(true); };
  const openEdit = (t) => { setEditing(t); setForm(t); setModal(true); };
  const close = () => { setModal(false); setEditing(null); };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    setUploading(true);
    try { const fd = new FormData(); fd.append('file', file); fd.append('folder', 'testimonials'); const r = await uploadAPI.uploadImage(fd); setForm(f => ({ ...f, avatarUrl: r.data.url, avatarPublicId: r.data.publicId })); toast.success('Avatar uploaded'); }
    catch { toast.error('Upload failed'); } finally { setUploading(false); }
  };

  const handleSave = async () => {
    if (!form.name || !form.quote) return toast.error('Name and quote required');
    setSaving(true);
    try {
      if (editing) { await testimonialAPI.update(editing._id, form); toast.success('Updated'); }
      else { await testimonialAPI.create(form); toast.success('Created'); }
      close(); load();
    } catch { toast.error('Save failed'); } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try { await testimonialAPI.delete(id); toast.success('Deleted'); setItems(i => i.filter(x => x._id !== id)); }
    catch { toast.error('Failed'); }
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div><h1 className={styles.pageTitle}>Testimonials</h1><p className={styles.pageSub}>{items.length} client reviews</p></div>
        <button className="btn btn-primary" onClick={openNew}><FiPlus size={16}/> Add Testimonial</button>
      </div>

      {loading ? <div className={styles.empty}>Loading...</div> : items.length === 0 ? <div className={styles.empty}>No testimonials yet.</div> : (
        <div className={styles.grid}>
          {items.map(t => (
            <div key={t._id} className={styles.card}>
              <div className={styles.cardBody}>
                <div style={{ display:'flex', gap:6, marginBottom:8 }}>
                  {[...Array(t.rating||5)].map((_,i)=><FiStar key={i} size={14} style={{ color:'#F6AD55', fill:'#F6AD55' }}/>)}
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                  {t.avatarUrl
                    ? <img src={t.avatarUrl} alt={t.name} style={{ width:36,height:36,borderRadius:'50%',objectFit:'cover' }} />
                    : <div style={{ width:36,height:36,borderRadius:'50%',background:'var(--navy)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:'1rem' }}>{t.name.charAt(0)}</div>}
                  <div>
                    <div style={{ fontWeight:700, fontSize:'0.9rem', color:'var(--navy)' }}>{t.name}</div>
                    <div style={{ fontSize:'0.75rem', color:'var(--grey-text)' }}>{t.businessName}</div>
                  </div>
                </div>
                <blockquote style={{ fontSize:'0.875rem', color:'var(--body-text)', fontStyle:'italic', lineHeight:1.65, borderLeft:'3px solid var(--green)', paddingLeft:12 }}>"{t.quote}"</blockquote>
                <div style={{ marginTop:8, display:'flex', gap:6 }}>
                  {t.featured && <span style={{ fontSize:'0.62rem', fontWeight:700, fontFamily:'var(--font-heading)', background:'#FFF3CD', color:'#854D0E', padding:'2px 8px', borderRadius:'50px' }}>★ Featured</span>}
                  {!t.published && <span style={{ fontSize:'0.62rem', fontWeight:700, fontFamily:'var(--font-heading)', background:'#FFF5F5', color:'#E53E3E', padding:'2px 8px', borderRadius:'50px' }}>Draft</span>}
                </div>
              </div>
              <div className={styles.cardActions}>
                <button className={`btn btn-outline-dark btn-sm ${styles.editBtn}`} onClick={() => openEdit(t)}><FiEdit2 size={14}/> Edit</button>
                <button className="btn btn-sm" style={{ background:'#FFF5F5', color:'#E53E3E', border:'1px solid #FC8181' }} onClick={() => handleDelete(t._id)}><FiTrash2 size={14}/></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <button onClick={close} className={styles.closeBtn}><FiX size={18}/></button>
            </div>
            <div className={styles.modalBody}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 16px' }}>
                <div className="form-group"><label className="form-label">Client Name *</label><input className="form-input" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} /></div>
                <div className="form-group"><label className="form-label">Business Name</label><input className="form-input" value={form.businessName} onChange={e=>setForm(f=>({...f,businessName:e.target.value}))} /></div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 16px' }}>
                <div className="form-group"><label className="form-label">Business Type</label><input className="form-input" value={form.businessType} onChange={e=>setForm(f=>({...f,businessType:e.target.value}))} placeholder="e.g. Landscaper" /></div>
                <div className="form-group"><label className="form-label">Location</label><input className="form-input" value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))} /></div>
              </div>
              <div className="form-group"><label className="form-label">Quote *</label><textarea className="form-input" rows={4} value={form.quote} onChange={e=>setForm(f=>({...f,quote:e.target.value}))} style={{ resize:'vertical' }} /></div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 16px' }}>
                <div className="form-group">
                  <label className="form-label">Rating</label>
                  <select className="form-input" value={form.rating} onChange={e=>setForm(f=>({...f,rating:Number(e.target.value)}))}>
                    {[5,4,3].map(n=><option key={n} value={n}>{n} Stars</option>)}
                  </select>
                </div>
                <div className="form-group"><label className="form-label">Order</label><input className="form-input" type="number" value={form.order} onChange={e=>setForm(f=>({...f,order:Number(e.target.value)}))} /></div>
              </div>
              <div className="form-group">
                <label className="form-label">Avatar Photo</label>
                <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                  {form.avatarUrl && <img src={form.avatarUrl} alt="avatar" style={{ width:36,height:36,borderRadius:'50%',objectFit:'cover' }} />}
                  <button className="btn btn-outline-dark btn-sm" onClick={()=>fileRef.current?.click()} disabled={uploading} type="button">
                    <FiUpload size={14}/> {uploading ? 'Uploading...' : 'Upload Avatar'}
                  </button>
                </div>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display:'none' }} />
              </div>
              <div style={{ display:'flex', gap:20 }}>
                <label style={{ display:'flex', alignItems:'center', gap:8, fontSize:'0.9rem', cursor:'pointer' }}><input type="checkbox" checked={form.featured} onChange={e=>setForm(f=>({...f,featured:e.target.checked}))} style={{ accentColor:'var(--green)' }} /> Featured</label>
                <label style={{ display:'flex', alignItems:'center', gap:8, fontSize:'0.9rem', cursor:'pointer' }}><input type="checkbox" checked={form.published} onChange={e=>setForm(f=>({...f,published:e.target.checked}))} style={{ accentColor:'var(--green)' }} /> Published</label>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button onClick={close} className="btn btn-outline-dark">Cancel</button>
              <button onClick={handleSave} className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : editing ? 'Update' : 'Add Testimonial'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
