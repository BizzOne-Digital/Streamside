import { useState, useEffect } from 'react';
import { FiSave, FiUser, FiGlobe, FiLock } from 'react-icons/fi';
import { settingsAPI, authAPI } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import styles from './AdminPage.module.css';

export default function SettingsAdminPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState('site');
  const [site, setSite] = useState({ phone:'250-889-6907', email:'streamsidebookkeeping@gmail.com', address:'Vancouver Island, BC', facebook:'https://www.facebook.com/share/1BkAXlfr', linkedin:'', instagram:'', businessHours:'Monday–Friday, 9am–5pm PST', tagline:'Grow with the Flow' });
  const [profile, setProfile] = useState({ name: user?.name || '', email: user?.email || '', currentPassword:'', newPassword:'' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    settingsAPI.get({ group: 'contact' })
      .then(r => { if (r.data.settings) setSite(s => ({ ...s, ...r.data.settings })); })
      .catch(() => {});
  }, []);

  const saveSite = async () => {
    setSaving(true);
    try { await settingsAPI.update(site); toast.success('Settings saved'); }
    catch { toast.error('Save failed'); } finally { setSaving(false); }
  };

  const saveProfile = async () => {
    setSaving(true);
    try { await authAPI.updateProfile(profile); toast.success('Profile updated'); setProfile(p => ({ ...p, currentPassword:'', newPassword:'' })); }
    catch (e) { toast.error(e.response?.data?.message || 'Update failed'); } finally { setSaving(false); }
  };

  const F = ({ label, value, onChange, type='text', placeholder='' }) => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input className="form-input" type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}><div><h1 className={styles.pageTitle}>Settings</h1><p className={styles.pageSub}>Site configuration and account settings</p></div></div>

      <div className={styles.tabs}>
        {[['site','🌐 Site Settings'],['account','👤 Account']].map(([k,l]) => (
          <button key={k} className={`${styles.tab} ${tab===k?styles.activeTab:''}`} onClick={()=>setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === 'site' && (
        <div style={{ background:'var(--white)', borderRadius:'var(--radius-md)', boxShadow:'var(--shadow-sm)', padding:'32px' }}>
          <h2 style={{ fontSize:'1.2rem', color:'var(--navy)', marginBottom:24, display:'flex', alignItems:'center', gap:8 }}><FiGlobe size={18}/> Site Contact Information</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 24px' }}>
            <F label="Phone Number" value={site.phone} onChange={v=>setSite(s=>({...s,phone:v}))} placeholder="250-889-6907" />
            <F label="Email Address" value={site.email} onChange={v=>setSite(s=>({...s,email:v}))} type="email" />
            <F label="Location/Address" value={site.address} onChange={v=>setSite(s=>({...s,address:v}))} />
            <F label="Business Hours" value={site.businessHours} onChange={v=>setSite(s=>({...s,businessHours:v}))} />
            <F label="Facebook URL" value={site.facebook} onChange={v=>setSite(s=>({...s,facebook:v}))} placeholder="https://facebook.com/..." />
            <F label="LinkedIn URL" value={site.linkedin} onChange={v=>setSite(s=>({...s,linkedin:v}))} placeholder="https://linkedin.com/..." />
            <F label="Instagram URL" value={site.instagram} onChange={v=>setSite(s=>({...s,instagram:v}))} placeholder="https://instagram.com/..." />
            <F label="Tagline" value={site.tagline} onChange={v=>setSite(s=>({...s,tagline:v}))} />
          </div>
          <button className="btn btn-primary" onClick={saveSite} disabled={saving} style={{ marginTop:8 }}><FiSave size={15}/> {saving?'Saving...':'Save Settings'}</button>
        </div>
      )}

      {tab === 'account' && (
        <div style={{ background:'var(--white)', borderRadius:'var(--radius-md)', boxShadow:'var(--shadow-sm)', padding:'32px', maxWidth:480 }}>
          <h2 style={{ fontSize:'1.2rem', color:'var(--navy)', marginBottom:24, display:'flex', alignItems:'center', gap:8 }}><FiUser size={18}/> Your Account</h2>
          <F label="Full Name" value={profile.name} onChange={v=>setProfile(p=>({...p,name:v}))} />
          <F label="Email Address" value={profile.email} onChange={v=>setProfile(p=>({...p,email:v}))} type="email" />
          <hr style={{ border:'none', borderTop:'1px solid var(--grey-mid)', margin:'20px 0' }} />
          <h3 style={{ fontSize:'1rem', color:'var(--navy)', marginBottom:16, display:'flex', alignItems:'center', gap:6 }}><FiLock size={15}/> Change Password</h3>
          <F label="Current Password" value={profile.currentPassword} onChange={v=>setProfile(p=>({...p,currentPassword:v}))} type="password" placeholder="Leave blank to keep current" />
          <F label="New Password" value={profile.newPassword} onChange={v=>setProfile(p=>({...p,newPassword:v}))} type="password" placeholder="Min 6 characters" />
          <button className="btn btn-primary" onClick={saveProfile} disabled={saving}><FiSave size={15}/> {saving?'Saving...':'Update Profile'}</button>
        </div>
      )}
    </div>
  );
}
