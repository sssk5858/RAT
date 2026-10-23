import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/useApp';
import { 
  BarChart3, 
  Film, 
  Clock, 
  Share2, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  ShieldCheck, 
  SlidersHorizontal,
  Calendar,
  Layers
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

type SortOption = 'newest' | 'oldest' | 'most_clips' | 'longest_duration';

export const ArchiveResultsScreen: React.FC = () => {
  const {
    report,
    openShareModal,
    openClipPlayer,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [expandedMonths, setExpandedMonths] = useState<Record<string, boolean>>({});

  // Toggle month expansion
  const toggleMonth = (monthKey: string) => {
    setExpandedMonths((prev) => ({
      ...prev,
      [monthKey]: !prev[monthKey],
    }));
  };

  const expandAll = () => {
    if (!report) return;
    const all: Record<string, boolean> = {};
    report.months.forEach((m) => (all[m.monthKey] = true));
    setExpandedMonths(all);
  };

  const collapseAll = () => {
    setExpandedMonths({});
  };

  // Filter and sort months
  const filteredAndSortedMonths = useMemo(() => {
    if (!report) return [];

    let list = [...report.months];

    // Filter by search query (month name, year, or any clip title/tag)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((m) => {
        const matchesMonth = m.monthName.toLowerCase().includes(q);
        const matchesClips = m.clips.some(
          (c) => c.title.toLowerCase().includes(q) || c.tag.toLowerCase().includes(q)
        );
        return matchesMonth || matchesClips;
      });
    }

    // Sort
    list.sort((a, b) => {
      if (sortOption === 'newest') {
        return b.monthKey.localeCompare(a.monthKey);
      }
      if (sortOption === 'oldest') {
        return a.monthKey.localeCompare(b.monthKey);
      }
      if (sortOption === 'most_clips') {
        return b.clipCount - a.clipCount;
      }
      if (sortOption === 'longest_duration') {
        return b.totalDurationMinutes - a.totalDurationMinutes;
      }
      return 0;
    });

    return list;
  }, [report, searchQuery, sortOption]);

  if (!report) {
    return (
      <div className="text-center py-20 text-slate-400">
        No report generated yet.
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-8 px-4">
      {/* Top Header Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#1B2636]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#72F5A1]">
              AUDIT RECORD // {report.sessionId}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-[11px] font-mono text-slate-400">
              Generated: {report.generatedAt}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <span>Archive Analysis Report</span>
            <StatusBadge label="VERIFIED SIMULATION" variant="simulation" size="sm" />
          </h1>
        </div>

        {/* Action Button: Share */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={openShareModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#72F5A1] hover:bg-[#5fe08f] text-[#080B10] font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(114,245,161,0.25)] hover:scale-105 active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Report</span>
          </button>
        </div>
      </div>

      {/* Summary Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <div className="p-4 rounded-xl bg-[#101720] border border-[#1B2636]">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase">Timeline Period</span>
            <Calendar className="w-4 h-4 text-[#72F5A1]" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-white">
            {report.timelineLabel}
          </div>
          <div className="text-[11px] text-slate-500 font-mono mt-0.5">
            {report.monthsCount} temporal buckets
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#101720] border border-[#1B2636]">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase">Total Clips</span>
            <Film className="w-4 h-4 text-[#38BDF8]" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-white">
            {report.totalClips}
          </div>
          <div className="text-[11px] text-slate-500 font-mono mt-0.5">
            Synthetic video records
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#101720] border border-[#1B2636]">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase">Total Duration</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-white">
            {report.totalDurationFormatted}
          </div>
          <div className="text-[11px] text-slate-500 font-mono mt-0.5">
            Simulated playback runtime
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#101720] border border-[#1B2636]">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase">Sandbox Status</span>
            <BarChart3 className="w-4 h-4 text-[#72F5A1]" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-[#72F5A1]">
            100% MOCK
          </div>
          <div className="text-[11px] text-slate-500 font-mono mt-0.5">
            Airgapped client memory
          </div>
        </div>
      </div>

      {/* Persistent simulation disclosure banner */}
      <div className="mb-6 p-3 rounded-xl bg-[#080B10] border border-[#1B2636] flex items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#72F5A1] shrink-0" />
          <span>
            <strong className="text-slate-200">Notice:</strong> All media shown is simulated. No real camera, video storage, or private files are accessible.
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
          DETERMINISTIC_MODEL_v2
        </span>
      </div>

      {/* Filter, Search & Sort Control Strip */}
      <div className="p-4 rounded-xl bg-[#101720] border border-[#1B2636] mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search months or clip titles (e.g. October, Telemetry)..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#080B10] border border-[#1B2636] text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#72F5A1]/60"
          />
        </div>

        {/* Sort Selector & Expand All Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <select
              aria-label="Sort months"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="bg-[#080B10] text-xs font-mono text-slate-200 px-2.5 py-2 rounded-lg border border-[#1B2636] focus:outline-none focus:border-[#72F5A1]"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="most_clips">Most Clips</option>
              <option value="longest_duration">Longest Duration</option>
            </select>
          </div>

          <div className="flex items-center gap-1 text-xs">
            <button
              type="button"
              onClick={expandAll}
              className="px-2.5 py-1.5 rounded-lg bg-[#080B10] hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono border border-[#1B2636] transition-colors"
            >
              Expand All
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="px-2.5 py-1.5 rounded-lg bg-[#080B10] hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono border border-[#1B2636] transition-colors"
            >
              Collapse
            </button>
          </div>
        </div>
      </div>

      {/* Month Cards Accordion / List */}
      <div className="space-y-4 mb-8">
        {filteredAndSortedMonths.length > 0 ? (
          filteredAndSortedMonths.map((month) => {
            const isExpanded = !!expandedMonths[month.monthKey];

            return (
              <div
                key={month.monthKey}
                className="rounded-2xl bg-[#101720] border border-[#1B2636] hover:border-slate-700/80 transition-all overflow-hidden"
              >
                {/* Month Card Header / Summary Row */}
                <div
                  onClick={() => toggleMonth(month.monthKey)}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-[#131C27] transition-colors select-none"
                >
                  <div className="flex items-center gap-4">
                    {/* Play/Folder Icon or Month Image Thumbnail */}
                    {month.shortMonth === 'Oct' || month.monthName.toLowerCase().includes('october') ? (
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#72F5A1]/50 shadow-[0_0_15px_rgba(114,245,161,0.25)] shrink-0 group-hover:scale-105 transition-transform">
                        <img 
                          src="/OCT.jpeg" 
                          alt="October Archive Record" 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080B10]/70 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-0.5 right-0.5 bg-[#080B10]/90 text-[8px] font-mono px-1 rounded text-[#72F5A1] font-bold">
                          OCT
                        </div>
                      </div>
                    ) : month.shortMonth === 'Sep' || month.monthName.toLowerCase().includes('september') ? (
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#38BDF8]/50 shadow-[0_0_15px_rgba(56,189,248,0.25)] shrink-0 group-hover:scale-105 transition-transform">
                        <img 
                          src="/Sept.png" 
                          alt="September Archive Record" 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080B10]/70 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-0.5 right-0.5 bg-[#080B10]/90 text-[8px] font-mono px-1 rounded text-[#38BDF8] font-bold">
                          SEP
                        </div>
                      </div>
                    ) : (
                      <div className="w-11 h-11 rounded-xl bg-[#080B10] border border-[#1B2636] flex items-center justify-center text-[#72F5A1] shrink-0">
                        <Film className="w-5 h-5" />
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-base font-bold text-slate-100 font-sans">
                          {month.monthName}
                        </h3>
                        <StatusBadge
                          label={month.status}
                          variant="neutral"
                          size="sm"
                        />
                      </div>

                      <div className="flex items-center gap-3 mt-1 text-xs font-mono text-slate-400">
                        <span className="text-[#38BDF8] font-semibold">{month.clipCount} simulated clips</span>
                        <span className="text-slate-600">•</span>
                        <span>{month.totalDurationFormatted}</span>
                      </div>
                    </div>
                  </div>

                  {/* Activity Bar & Expand Button */}
                  <div className="flex items-center justify-between md:justify-end gap-5">
                    {/* Activity Histogram Bars */}
                    <div className="flex items-end gap-1 h-7 px-2.5 py-1 rounded-lg bg-[#080B10] border border-[#1B2636]/80">
                      {month.activityBar.map((val, idx) => (
                        <div
                          key={idx}
                          title={`Relative cluster density: ${val}%`}
                          className="w-1.5 rounded-xs transition-all bg-[#72F5A1]/40 hover:bg-[#72F5A1]"
                          style={{ height: `${val}%` }}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                        {isExpanded ? 'Hide Details' : 'View Clips'}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-[#080B10] border border-[#1B2636] flex items-center justify-center text-slate-400">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Month Detail (Screen 8) */}
                {isExpanded && (
                  <div className="border-t border-[#1B2636] bg-[#0C1118] p-5 animate-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-[#72F5A1]" />
                        <span>Fictional Metadata Entries for {month.monthName}</span>
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        Displaying {month.clips.length} of {month.clipCount} clips
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {month.clips.map((clip) => (
                        <div
                          key={clip.id}
                          className="p-3.5 rounded-xl bg-[#101720] border border-[#1B2636] hover:border-[#72F5A1]/40 flex items-center justify-between gap-3 transition-all group"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <button
                              type="button"
                              onClick={() => openClipPlayer(clip)}
                              className="w-9 h-9 rounded-lg bg-[#080B10] group-hover:bg-[#72F5A1] group-hover:text-[#080B10] text-[#72F5A1] border border-[#1B2636] flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-sm"
                              title="Play simulated clip"
                            >
                              <Play className="w-4 h-4 ml-0.5 fill-current" />
                            </button>

                            <div className="overflow-hidden">
                              <div className="text-xs font-bold text-slate-200 truncate group-hover:text-white">
                                {clip.title}
                              </div>
                              <div className="text-[10px] font-mono text-slate-500 truncate mt-0.5">
                                {clip.timestamp}
                              </div>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="text-xs font-mono font-semibold text-slate-300">
                              {clip.durationFormatted}
                            </div>
                            <div className="text-[10px] font-mono text-slate-500">
                              {clip.sizeMb} MB
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          /* Graceful empty state */
          <div className="p-12 text-center rounded-2xl bg-[#101720] border border-[#1B2636]">
            <Search className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-200">No mock entries found</h3>
            <p className="text-xs text-slate-500 mt-1">
              No simulated months or clips matched query &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-4 px-3 py-1.5 rounded-lg bg-[#080B10] border border-[#1B2636] text-xs font-mono text-[#72F5A1] hover:bg-slate-800 transition-colors"
            >
              Clear Search Filter
            </button>
          </div>
        )}
      </div>

      {/* Prominent Share Report Button at bottom of archive list */}
      <div className="p-6 rounded-2xl bg-[#101720] border border-[#1B2636] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Share Forensic Audit Report</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Create an isolated shareable demo link with a cryptographic token.
          </p>
        </div>

        <button
          type="button"
          onClick={openShareModal}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#72F5A1] hover:bg-[#5fe08f] text-[#080B10] font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(114,245,161,0.25)] flex items-center justify-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          <span>Generate Share Link</span>
        </button>
      </div>
    </div>
  );
};
