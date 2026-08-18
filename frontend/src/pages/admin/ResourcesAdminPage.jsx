import { useState, useEffect, useRef } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUpload, FiDownload } from 'react-icons/fi';
import { resourceAPI, uploadAPI } from '../../utils/api';
import { toast } from 'react-toastify';
import styles from './AdminPage.module.css';

const cats = [
  { value:'guides', label:'Free Guides & Downloads' },
  { value:'bookkeeping-basics', label:'Bookkeeping Basics' },
  { value:'contractor-trades', label:'Contractor & Trades' },
  { value:'important-dates', label:'Important Dates & Gov Resources' },
];
const types = ['download','article','link','checklist'];
const empty = { title:'', description:'', category:'guides', type:'article', fileUrl:'', thumbnailUrl:'', externalLink:'', featured:false, published:true, order:0, tags:[] };

export default function ResourcesAdminPage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const load = async () => { setLoading(true); try { const r = await resourceAPI.getAll(); setResources(r.data.resources || []); } catch { toast.error('Failed to load'); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm(empty); setModal(true); };
  const openEdit = (r) => { setEditing(r); setForm(r); setModal(true); };
  const close = () => { setModal(false); setEditing(null); };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', form.type === 'download' ? 'guides' : 'resources');
      const r = await uploadAPI.uploadImage(fd);
      setForm(f => ({ ...f, fileUrl: r.data.url, filePublicId: r.data.publicId }));
      toast.success('File uploaded successfully');
    } catch { toast.error('Upload failed'); }
    finally { setUploading(false); }
  };

  const handleSave = async () => {
    if (!form.title || !form.category) return toast.error('Title and category required');
    setSaving(true);
    try {
      if (editing) { await resourceAPI.update(editing._id, form); toast.success('Resource updated'); }
      else { await resourceAPI.create(form); toast.success('Resource created'); }
      close(); load();
    } catch { toast.error('Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this resource?')) return;
    try { await resourceAPI.delete(id); toast.success('Deleted'); setResources(r => r.filter(x => x._id !== id)); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div><h1 className={styles.pageTitle}>Resources</h1><p className={styles.pageSub}>{resources.length} resources</p></div>
        <button className="btn btn-primary" onClick={openNew}><FiPlus size={16}/> Add Resource</button>
      </div>

      {loading ? <div className={styles.empty}>Loading...</div> : resources.length === 0 ? <div className={styles.empty}>No resources yet. Add your first guide or article.</div> : (
        <div className={styles.grid}>
          {resources.map(r => (
            <div key={r._id} className={styles.card}>
              {r.thumbnailUrl && <img src={r.thumbnailUrl} alt={r.title} style={{ width:'100%', height:140, objectFit:'cover' }} />}
              <div className={styles.cardBody}>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <span style={{ fontSize:'0.62rem', fontWeight:700, fontFamily:'var(--font-heading)', background:'var(--green-bg)', color:'var(--green)', padding:'2px 8px', borderRadius:'50px', textTransform:'uppercase', letterSpacing:'0.08em' }}>{r.type}</span>
                  <span style={{ fontSize:'0.62rem', fontWeight:700, fontFamily:'var(--font-heading)', background:'var(--grey-mid)', color:'var(--grey-text)', padding:'2px 8px', borderRadius:'50px', textTransform:'uppercase', letterSpacing:'0.08em' }}>{r.category}</span>
                  {r.featured && <span style={{ fontSize:'0.62rem', fontWeight:700, fontFamily:'var(--font-heading)', background:'#FFF3CD', color:'#854D0E', padding:'2px 8px', borderRadius:'50px' }}>★ Featured</span>}
                  {!r.published && <span style={{ fontSize:'0.62rem', fontWeight:700, fontFamily:'var(--font-heading)', background:'#FFF5F5', color:'#E53E3E', padding:'2px 8px', borderRadius:'50px' }}>Draft</span>}
                </div>
                <div className={styles.cardTitle}>{r.title}</div>
                <div className={styles.cardSub} style={{ fontSize:'0.8rem', lineHeight:1.5 }}>{r.description?.slice(0,100)}{r.description?.length > 100 ? '...' : ''}</div>
                {r.downloadCount > 0 && <div style={{ fontSize:'0.75rem', color:'var(--grey-text)', display:'flex', alignItems:'center', gap:4 }}><FiDownload size={12}/> {r.downloadCount} downloads</div>}
              </div>
              <div className={styles.cardActions}>
                <button className={`btn btn-outline-dark btn-sm ${styles.editBtn}`} onClick={() => openEdit(r)}><FiEdit2 size={14}/> Edit</button>
                <button className="btn btn-sm" style={{ background:'#FFF5F5', color:'#E53E3E', border:'1px solid #FC8181' }} onClick={() => handleDelete(r._id)}><FiTrash2 size={14}/></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{editing ? 'Edit Resource' : 'Add Resource'}</h3>
              <button onClick={close} className={styles.closeBtn}><FiX size={18}/></button>
            </div>
            <div className={styles.modalBody}>
              <div className="form-group"><label className="form-label">Title *</label><input className="form-input" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} /></div>
              <div className="form-group"><label className="form-label">Description *</label><textarea className="form-input" rows={3} value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} style={{ resize:'vertical' }} /></div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 16px' }}>
                <div className="form-group"><label className="form-label">Category *</label><select className="form-input" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>{cats.map(c=><option key={c.value} value={c.value}>{c.label}</option>)}</select></div>
                <div className="form-group"><label className="form-label">Type</label><select className="form-input" value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}>{types.map(t=><option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}</select></div>
              </div>
              {/* File Upload */}
              <div className="form-group">
                <label className="form-label">Upload File (PDF, Image)</label>
                <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                  <button className="btn btn-outline-dark btn-sm" onClick={()=>fileRef.current?.click()} disabled={uploading} type="button">
                    <FiUpload size={14}/> {uploading ? 'Uploading...' : 'Upload to Cloudinary'}
                  </button>
                  {form.fileUrl && <a href={form.fileUrl} target="_blank" rel="noreferrer" style={{ fontSize:'0.8rem', color:'var(--green)' }}>✓ File uploaded</a>}
                </div>
                <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" onChange={handleUpload} style={{ display:'none' }} />
              </div>
              <div className="form-group"><label className="form-label">Thumbnail URL</label><input className="form-input" value={form.thumbnailUrl} onChange={e=>setForm(f=>({...f,thumbnailUrl:e.target.value}))} placeholder="https://..." /></div>
              <div className="form-group"><label className="form-label">External Link</label><input className="form-input" value={form.externalLink} onChange={e=>setForm(f=>({...f,externalLink:e.target.value}))} placeholder="https://..." /></div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 16px' }}>
                <div className="form-group"><label className="form-label">Order</label><input className="form-input" type="number" value={form.order} onChange={e=>setForm(f=>({...f,order:Number(e.target.value)}))} /></div>
              </div>
              <div style={{ display:'flex', gap:20 }}>
                <label style={{ display:'flex', alignItems:'center', gap:8, fontSize:'0.9rem', cursor:'pointer' }}><input type="checkbox" checked={form.featured} onChange={e=>setForm(f=>({...f,featured:e.target.checked}))} style={{ accentColor:'var(--green)' }} /> Featured</label>
                <label style={{ display:'flex', alignItems:'center', gap:8, fontSize:'0.9rem', cursor:'pointer' }}><input type="checkbox" checked={form.published} onChange={e=>setForm(f=>({...f,published:e.target.checked}))} style={{ accentColor:'var(--green)' }} /> Published</label>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button onClick={close} className="btn btn-outline-dark">Cancel</button>
              <button onClick={handleSave} className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : editing ? 'Update' : 'Create Resource'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
