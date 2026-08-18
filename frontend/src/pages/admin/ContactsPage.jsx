import { useState, useEffect } from 'react';
import { FiTrash2, FiEdit2, FiX, FiSearch, FiMail, FiPhone } from 'react-icons/fi';
import { contactAPI } from '../../utils/api';
import { toast } from 'react-toastify';
import styles from './AdminPage.module.css';

const statuses = ['new','contacted','qualified','converted','closed'];
const statusColors = { new: '#3182CE', contacted: '#DD6B20', qualified: '#2F855A', converted: '#553C9A', closed: '#718096' };

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(false);

  const load = async (status = filter) => {
    setLoading(true);
    try {
      const r = await contactAPI.getAll({ status: status || undefined, limit: 50 });
      setContacts(r.data.contacts || []);
      setTotal(r.data.total || 0);
    } catch { toast.error('Failed to load contacts'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this contact?')) return;
    try { await contactAPI.delete(id); toast.success('Contact deleted'); setContacts(c => c.filter(x => x._id !== id)); if (selected?._id === id) setSelected(null); }
    catch { toast.error('Delete failed'); }
  };

  const handleStatusUpdate = async (id, status) => {
    setUpdating(true);
    try {
      const r = await contactAPI.update(id, { status });
      setContacts(c => c.map(x => x._id === id ? { ...x, status } : x));
      if (selected?._id === id) setSelected(prev => ({ ...prev, status }));
      toast.success('Status updated');
    } catch { toast.error('Update failed'); }
    finally { setUpdating(false); }
  };

  const handleNotesUpdate = async () => {
    setUpdating(true);
    try {
      await contactAPI.update(selected._id, { notes: selected.notes });
      setContacts(c => c.map(x => x._id === selected._id ? { ...x, notes: selected.notes } : x));
      toast.success('Notes saved');
    } catch { toast.error('Save failed'); }
    finally { setUpdating(false); }
  };

  const filtered = contacts.filter(c =>
    !filter || c.status === filter
  );

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Contacts & Leads</h1>
          <p className={styles.pageSub}>{total} total inquiries</p>
        </div>
      </div>

      {/* Status filter tabs */}
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${!filter ? styles.activeTab : ''}`} onClick={() => { setFilter(''); load(''); }}>All ({total})</button>
        {statuses.map(s => (
          <button key={s} className={`${styles.tab} ${filter === s ? styles.activeTab : ''}`} onClick={() => { setFilter(s); load(s); }}>
            <span className={styles.dot} style={{ background: statusColors[s] }} />
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className={`${styles.layout} ${selected ? styles.withDetail : ''}`}>
        {/* Table */}
        <div className={styles.tableWrap}>
          {loading ? <div className={styles.empty}>Loading...</div> : filtered.length === 0 ? <div className={styles.empty}>No contacts found.</div> : (
            <div className={styles.table}>
              {filtered.map(c => (
                <div key={c._id} className={`${styles.row} ${selected?._id === c._id ? styles.rowSelected : ''}`} onClick={() => setSelected(c)}>
                  <div className={styles.rowMain}>
                    <div className={styles.rowName}>{c.name}</div>
                    <div className={styles.rowBiz}>{c.businessName || c.businessType || 'Unknown business'}</div>
                  </div>
                  <div className={styles.rowContact}>
                    <a href={`mailto:${c.email}`} onClick={e => e.stopPropagation()}><FiMail size={13}/> {c.email}</a>
                    {c.phone && <a href={`tel:${c.phone}`} onClick={e => e.stopPropagation()}><FiPhone size={13}/> {c.phone}</a>}
                  </div>
                  <div className={styles.rowHelp}>{c.helpNeeded}</div>
                  <div>
                    <span className={styles.statusBadge} style={{ background: `${statusColors[c.status]}18`, color: statusColors[c.status] }}>{c.status}</span>
                  </div>
                  <div className={styles.rowDate}>{new Date(c.createdAt).toLocaleDateString('en-CA')}</div>
                  <button className={styles.deleteBtn} onClick={e => { e.stopPropagation(); handleDelete(c._id); }}><FiTrash2 size={14}/></button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className={styles.detail}>
            <div className={styles.detailHeader}>
              <h3 className={styles.detailName}>{selected.name}</h3>
              <button onClick={() => setSelected(null)} className={styles.closeBtn}><FiX size={18}/></button>
            </div>
            <div className={styles.detailBody}>
              <div className={styles.field}><span>Business</span><strong>{selected.businessName || '—'}</strong></div>
              <div className={styles.field}><span>Type</span><strong>{selected.businessType || '—'}</strong></div>
              <div className={styles.field}><span>Email</span><a href={`mailto:${selected.email}`}>{selected.email}</a></div>
              <div className={styles.field}><span>Phone</span><strong>{selected.phone || '—'}</strong></div>
              <div className={styles.field}><span>Help Needed</span><strong>{selected.helpNeeded}</strong></div>
              <div className={styles.field}><span>Preferred Contact</span><strong>{selected.preferredContact}</strong></div>
              <div className={styles.field}><span>Submitted</span><strong>{new Date(selected.createdAt).toLocaleString('en-CA')}</strong></div>
              {selected.additionalInfo && <div className={styles.note}><span>Additional Info</span><p>{selected.additionalInfo}</p></div>}

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Status</label>
                <select className="form-input" value={selected.status} onChange={e => handleStatusUpdate(selected._id, e.target.value)} disabled={updating}>
                  {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Internal Notes</label>
                <textarea className="form-input" rows={4} value={selected.notes || ''} onChange={e => setSelected(p => ({ ...p, notes: e.target.value }))} placeholder="Add notes about this lead..." style={{ resize: 'vertical' }} />
                <button className="btn btn-primary btn-sm" onClick={handleNotesUpdate} disabled={updating} style={{ marginTop: 8, alignSelf: 'flex-end' }}>
                  {updating ? 'Saving...' : 'Save Notes'}
                </button>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <a href={`mailto:${selected.email}`} className="btn btn-primary btn-sm"><FiMail size={14}/> Send Email</a>
                {selected.phone && <a href={`tel:${selected.phone}`} className="btn btn-outline-dark btn-sm"><FiPhone size={14}/> Call</a>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
