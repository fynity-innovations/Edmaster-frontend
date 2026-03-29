"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"

const API_URL = "http://127.0.0.1:8000"

// ── Types ──────────────────────────────────────────────────────────────────────

interface Student {
  id: string
  name: string
  email: string
  phone: string
  is_verified: boolean
  created_at: string
  updated_at: string
}

interface OTP {
  id: string
  phone: string
  otp: string
  is_used: boolean
  expires_at: string
  created_at: string
}

interface Stats {
  total_students: number
  verified_students: number
  unverified_students: number
  total_otps: number
  used_otps: number
}

type Tab = "students" | "otps"
type SortDir = "asc" | "desc"

// ── Helpers ────────────────────────────────────────────────────────────────────

function fmt(iso: string) {
  if (!iso) return "—"
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  })
}

function downloadCSV(filename: string, rows: string[][], headers: string[]) {
  const escape = (v: string) => `"${String(v ?? "").replace(/"/g, '""')}"`
  const lines = [headers.map(escape).join(","), ...rows.map(r => r.map(escape).join(","))]
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-1">
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
      <span className={`text-3xl font-bold ${color}`}>{value.toLocaleString()}</span>
    </div>
  )
}

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <span className="ml-1 text-gray-300">↕</span>
  return <span className="ml-1 text-indigo-600">{dir === "asc" ? "↑" : "↓"}</span>
}

function Th({
  label, col, sortBy, sortDir, onSort,
}: {
  label: string; col: string; sortBy: string; sortDir: SortDir
  onSort: (col: string) => void
}) {
  return (
    <th
      className="px-4 py-3 font-medium text-gray-600 cursor-pointer select-none whitespace-nowrap hover:text-indigo-600 transition-colors"
      onClick={() => onSort(col)}
    >
      {label}<SortIcon active={sortBy === col} dir={sortDir} />
    </th>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>("students")
  const [stats, setStats] = useState<Stats | null>(null)

  // Students state
  const [students, setStudents] = useState<Student[]>([])
  const [stuTotal, setStuTotal] = useState(0)
  const [stuPage, setStuPage] = useState(1)
  const [stuSearch, setStuSearch] = useState("")
  const [stuSearchInput, setStuSearchInput] = useState("")
  const [stuVerified, setStuVerified] = useState("")   // "" | "true" | "false"
  const [stuSortBy, setStuSortBy] = useState("created_at")
  const [stuSortDir, setStuSortDir] = useState<SortDir>("desc")
  const [stuLoading, setStuLoading] = useState(true)
  const [stuExporting, setStuExporting] = useState(false)

  // OTPs state
  const [otps, setOtps] = useState<OTP[]>([])
  const [otpTotal, setOtpTotal] = useState(0)
  const [otpPage, setOtpPage] = useState(1)
  const [otpSearch, setOtpSearch] = useState("")
  const [otpSearchInput, setOtpSearchInput] = useState("")
  const [otpUsed, setOtpUsed] = useState("")   // "" | "true" | "false"
  const [otpSortBy, setOtpSortBy] = useState("created_at")
  const [otpSortDir, setOtpSortDir] = useState<SortDir>("desc")
  const [otpLoading, setOtpLoading] = useState(true)
  const [otpExporting, setOtpExporting] = useState(false)

  const perPage = 20

  function getToken() {
    return typeof window !== "undefined" ? localStorage.getItem("admin_token") : null
  }
  function authHeaders(): Record<string, string> {
    return { Authorization: `Bearer ${getToken()}` }
  }
  function guard(res: Response) {
    if (res.status === 401) { router.push("/admin/login"); return false }
    return true
  }

  // ── Fetch stats ──
  const fetchStats = useCallback(async () => {
    const res = await fetch(`${API_URL}/api/admin/stats`, { headers: authHeaders() })
    if (!guard(res)) return
    const data = await res.json()
    if (data.success) setStats(data)
  }, [])

  // ── Fetch students ──
  const fetchStudents = useCallback(async () => {
    setStuLoading(true)
    const p = new URLSearchParams({
      page: String(stuPage), per_page: String(perPage),
      sort_by: stuSortBy, sort_dir: stuSortDir,
      ...(stuSearch ? { search: stuSearch } : {}),
      ...(stuVerified ? { verified: stuVerified } : {}),
    })
    const res = await fetch(`${API_URL}/api/admin/students?${p}`, { headers: authHeaders() })
    if (!guard(res)) return
    const data = await res.json()
    if (data.success) { setStudents(data.students); setStuTotal(data.total) }
    setStuLoading(false)
  }, [stuPage, stuSearch, stuVerified, stuSortBy, stuSortDir])

  // ── Fetch OTPs ──
  const fetchOtps = useCallback(async () => {
    setOtpLoading(true)
    const p = new URLSearchParams({
      page: String(otpPage), per_page: String(perPage),
      sort_by: otpSortBy, sort_dir: otpSortDir,
      ...(otpSearch ? { search: otpSearch } : {}),
      ...(otpUsed ? { used: otpUsed } : {}),
    })
    const res = await fetch(`${API_URL}/api/admin/otps?${p}`, { headers: authHeaders() })
    if (!guard(res)) return
    const data = await res.json()
    if (data.success) { setOtps(data.otps); setOtpTotal(data.total) }
    setOtpLoading(false)
  }, [otpPage, otpSearch, otpUsed, otpSortBy, otpSortDir])

  useEffect(() => {
    if (!getToken()) { router.push("/admin/login"); return }
    fetchStats()
  }, [])

  useEffect(() => { if (getToken()) fetchStudents() }, [fetchStudents])
  useEffect(() => { if (getToken()) fetchOtps() }, [fetchOtps])

  // ── Sort helpers ──
  function toggleStuSort(col: string) {
    if (stuSortBy === col) setStuSortDir(d => d === "asc" ? "desc" : "asc")
    else { setStuSortBy(col); setStuSortDir("desc") }
    setStuPage(1)
  }
  function toggleOtpSort(col: string) {
    if (otpSortBy === col) setOtpSortDir(d => d === "asc" ? "desc" : "asc")
    else { setOtpSortBy(col); setOtpSortDir("desc") }
    setOtpPage(1)
  }

  // ── CSV export ──
  async function exportStudents() {
    setStuExporting(true)
    const p = new URLSearchParams({
      export: "true", sort_by: stuSortBy, sort_dir: stuSortDir,
      ...(stuSearch ? { search: stuSearch } : {}),
      ...(stuVerified ? { verified: stuVerified } : {}),
    })
    const res = await fetch(`${API_URL}/api/admin/students?${p}`, { headers: authHeaders() })
    const data = await res.json()
    if (data.success) {
      const headers = ["#", "Name", "Email", "Phone", "Verified", "Registered", "Updated"]
      const rows = data.students.map((s: Student, i: number) => [
        String(i + 1), s.name, s.email, s.phone,
        s.is_verified ? "Yes" : "No",
        fmt(s.created_at), fmt(s.updated_at),
      ])
      downloadCSV(`students_${new Date().toISOString().slice(0,10)}.csv`, rows, headers)
    }
    setStuExporting(false)
  }

  async function exportOtps() {
    setOtpExporting(true)
    const p = new URLSearchParams({
      export: "true", sort_by: otpSortBy, sort_dir: otpSortDir,
      ...(otpSearch ? { search: otpSearch } : {}),
      ...(otpUsed ? { used: otpUsed } : {}),
    })
    const res = await fetch(`${API_URL}/api/admin/otps?${p}`, { headers: authHeaders() })
    const data = await res.json()
    if (data.success) {
      const headers = ["#", "Phone", "OTP", "Used", "Expires At", "Created At"]
      const rows = data.otps.map((o: OTP, i: number) => [
        String(i + 1), o.phone, o.otp,
        o.is_used ? "Yes" : "No",
        fmt(o.expires_at), fmt(o.created_at),
      ])
      downloadCSV(`otps_${new Date().toISOString().slice(0,10)}.csv`, rows, headers)
    }
    setOtpExporting(false)
  }

  function handleLogout() {
    fetch(`${API_URL}/api/admin/logout`, { method: "POST", headers: authHeaders() })
    localStorage.removeItem("admin_token")
    router.push("/admin/login")
  }

  const stuPages = Math.ceil(stuTotal / perPage)
  const otpPages = Math.ceil(otpTotal / perPage)

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <h1 className="text-lg font-bold text-indigo-700">EdMaster Admin</h1>
          <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-600 transition-colors">
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <StatCard label="Total Students" value={stats.total_students} color="text-indigo-600" />
            <StatCard label="Verified" value={stats.verified_students} color="text-green-600" />
            <StatCard label="Unverified" value={stats.unverified_students} color="text-yellow-600" />
            <StatCard label="Total OTPs" value={stats.total_otps} color="text-gray-700" />
            <StatCard label="OTPs Used" value={stats.used_otps} color="text-gray-700" />
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-200 rounded-xl p-1 w-fit">
          {(["students", "otps"] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                tab === t ? "bg-white shadow text-indigo-700" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t === "students" ? `Students (${stuTotal.toLocaleString()})` : `OTPs (${otpTotal.toLocaleString()})`}
            </button>
          ))}
        </div>

        {/* ── Students Tab ── */}
        {tab === "students" && (
          <div className="bg-white rounded-xl shadow-sm">
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-100 flex flex-wrap gap-3 items-center justify-between">
              <div className="flex flex-wrap gap-2 items-center">
                {/* Search */}
                <form onSubmit={e => { e.preventDefault(); setStuPage(1); setStuSearch(stuSearchInput) }} className="flex gap-2">
                  <input
                    value={stuSearchInput}
                    onChange={e => setStuSearchInput(e.target.value)}
                    placeholder="Search name, email, phone…"
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-52"
                  />
                  <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1.5 rounded-lg transition-colors">
                    Search
                  </button>
                  {stuSearch && (
                    <button type="button" onClick={() => { setStuSearchInput(""); setStuSearch(""); setStuPage(1) }}
                      className="text-sm text-gray-500 hover:text-gray-700">
                      Clear
                    </button>
                  )}
                </form>
                {/* Verified filter */}
                <select
                  value={stuVerified}
                  onChange={e => { setStuVerified(e.target.value); setStuPage(1) }}
                  className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All statuses</option>
                  <option value="true">Verified</option>
                  <option value="false">Unverified</option>
                </select>
              </div>
              {/* Export */}
              <button
                onClick={exportStudents}
                disabled={stuExporting}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm px-4 py-1.5 rounded-lg transition-colors"
              >
                {stuExporting ? "Exporting…" : "Export CSV"}
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 font-medium text-gray-600">#</th>
                    <Th label="Name" col="name" sortBy={stuSortBy} sortDir={stuSortDir} onSort={toggleStuSort} />
                    <Th label="Email" col="email" sortBy={stuSortBy} sortDir={stuSortDir} onSort={toggleStuSort} />
                    <Th label="Phone" col="phone" sortBy={stuSortBy} sortDir={stuSortDir} onSort={toggleStuSort} />
                    <Th label="Status" col="is_verified" sortBy={stuSortBy} sortDir={stuSortDir} onSort={toggleStuSort} />
                    <Th label="Registered" col="created_at" sortBy={stuSortBy} sortDir={stuSortDir} onSort={toggleStuSort} />
                    <Th label="Updated" col="updated_at" sortBy={stuSortBy} sortDir={stuSortDir} onSort={toggleStuSort} />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {stuLoading ? (
                    <tr><td colSpan={7} className="px-4 py-10 text-center text-gray-400">Loading…</td></tr>
                  ) : students.length === 0 ? (
                    <tr><td colSpan={7} className="px-4 py-10 text-center text-gray-400">No students found</td></tr>
                  ) : students.map((s, i) => (
                    <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-400 tabular-nums">{(stuPage - 1) * perPage + i + 1}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{s.name}</td>
                      <td className="px-4 py-3 text-gray-600">{s.email}</td>
                      <td className="px-4 py-3 text-gray-600 tabular-nums">{s.phone}</td>
                      <td className="px-4 py-3">
                        {s.is_verified
                          ? <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">Verified</span>
                          : <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-2 py-0.5 rounded-full">Unverified</span>}
                      </td>
                      <td className="px-4 py-3 text-gray-500 tabular-nums whitespace-nowrap">{fmt(s.created_at)}</td>
                      <td className="px-4 py-3 text-gray-500 tabular-nums whitespace-nowrap">{fmt(s.updated_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <Pagination page={stuPage} total={stuPages} totalRecords={stuTotal} perPage={perPage} onPage={setStuPage} />
          </div>
        )}

        {/* ── OTPs Tab ── */}
        {tab === "otps" && (
          <div className="bg-white rounded-xl shadow-sm">
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-100 flex flex-wrap gap-3 items-center justify-between">
              <div className="flex flex-wrap gap-2 items-center">
                <form onSubmit={e => { e.preventDefault(); setOtpPage(1); setOtpSearch(otpSearchInput) }} className="flex gap-2">
                  <input
                    value={otpSearchInput}
                    onChange={e => setOtpSearchInput(e.target.value)}
                    placeholder="Search phone…"
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-52"
                  />
                  <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1.5 rounded-lg transition-colors">
                    Search
                  </button>
                  {otpSearch && (
                    <button type="button" onClick={() => { setOtpSearchInput(""); setOtpSearch(""); setOtpPage(1) }}
                      className="text-sm text-gray-500 hover:text-gray-700">
                      Clear
                    </button>
                  )}
                </form>
                <select
                  value={otpUsed}
                  onChange={e => { setOtpUsed(e.target.value); setOtpPage(1) }}
                  className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All OTPs</option>
                  <option value="true">Used</option>
                  <option value="false">Unused</option>
                </select>
              </div>
              <button
                onClick={exportOtps}
                disabled={otpExporting}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm px-4 py-1.5 rounded-lg transition-colors"
              >
                {otpExporting ? "Exporting…" : "Export CSV"}
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 font-medium text-gray-600">#</th>
                    <Th label="Phone" col="phone" sortBy={otpSortBy} sortDir={otpSortDir} onSort={toggleOtpSort} />
                    <Th label="OTP Code" col="otp" sortBy={otpSortBy} sortDir={otpSortDir} onSort={toggleOtpSort} />
                    <Th label="Status" col="is_used" sortBy={otpSortBy} sortDir={otpSortDir} onSort={toggleOtpSort} />
                    <Th label="Expires At" col="expires_at" sortBy={otpSortBy} sortDir={otpSortDir} onSort={toggleOtpSort} />
                    <Th label="Created At" col="created_at" sortBy={otpSortBy} sortDir={otpSortDir} onSort={toggleOtpSort} />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {otpLoading ? (
                    <tr><td colSpan={6} className="px-4 py-10 text-center text-gray-400">Loading…</td></tr>
                  ) : otps.length === 0 ? (
                    <tr><td colSpan={6} className="px-4 py-10 text-center text-gray-400">No OTPs found</td></tr>
                  ) : otps.map((o, i) => (
                    <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-400 tabular-nums">{(otpPage - 1) * perPage + i + 1}</td>
                      <td className="px-4 py-3 text-gray-900 tabular-nums">{o.phone}</td>
                      <td className="px-4 py-3 font-mono font-semibold text-indigo-700 tracking-widest">{o.otp}</td>
                      <td className="px-4 py-3">
                        {o.is_used
                          ? <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">Used</span>
                          : <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">Active</span>}
                      </td>
                      <td className="px-4 py-3 text-gray-500 tabular-nums whitespace-nowrap">{fmt(o.expires_at)}</td>
                      <td className="px-4 py-3 text-gray-500 tabular-nums whitespace-nowrap">{fmt(o.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination page={otpPage} total={otpPages} totalRecords={otpTotal} perPage={perPage} onPage={setOtpPage} />
          </div>
        )}
      </main>
    </div>
  )
}

// ── Pagination component ───────────────────────────────────────────────────────
function Pagination({ page, total, totalRecords, perPage, onPage }: {
  page: number; total: number; totalRecords: number; perPage: number
  onPage: (p: number) => void
}) {
  if (total <= 1) return null
  const from = (page - 1) * perPage + 1
  const to = Math.min(page * perPage, totalRecords)
  return (
    <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between text-sm">
      <span className="text-gray-500">
        {from}–{to} of {totalRecords.toLocaleString()}
      </span>
      <div className="flex gap-2">
        <button onClick={() => onPage(1)} disabled={page === 1}
          className="px-2 py-1.5 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-40 hover:bg-gray-50 transition-colors text-xs">
          «
        </button>
        <button onClick={() => onPage(page - 1)} disabled={page === 1}
          className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-40 hover:bg-gray-50 transition-colors">
          Prev
        </button>
        <span className="px-3 py-1.5 text-gray-600">
          {page} / {total}
        </span>
        <button onClick={() => onPage(page + 1)} disabled={page === total}
          className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-40 hover:bg-gray-50 transition-colors">
          Next
        </button>
        <button onClick={() => onPage(total)} disabled={page === total}
          className="px-2 py-1.5 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-40 hover:bg-gray-50 transition-colors text-xs">
          »
        </button>
      </div>
    </div>
  )
}
