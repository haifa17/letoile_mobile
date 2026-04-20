"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO, startOfMonth } from "date-fns";
import { fr } from "date-fns/locale";

interface FormEntry {
  createdAt: string;
  [key: string]: unknown;
}

interface DashboardChartsProps {
  contacts: FormEntry[];
  portability: FormEntry[];
}

// Group entries by month → { "Jan 2025": count }
function groupByMonth(items: FormEntry[]): Record<string, number> {
  return items.reduce(
    (acc, item) => {
      const key = format(
        startOfMonth(parseISO(item.createdAt)),
        "MMM yyyy",
        { locale: fr },
      );
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
}

// Merge two month maps into a sorted array for recharts
function mergeMonthData(
  contactMap: Record<string, number>,
  portabilityMap: Record<string, number>,
) {
  const allKeys = Array.from(
    new Set([...Object.keys(contactMap), ...Object.keys(portabilityMap)]),
  ).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  return allKeys.map((month) => ({
    month,
    contact: contactMap[month] || 0,
    portabilite: portabilityMap[month] || 0,
  }));
}

const COLORS = {
  contact: "#6366f1",
  portabilite: "#f59e0b",
  contactLight: "#a5b4fc",
  portabiliteLight: "#fcd34d",
};

const DONUT_COLORS = [COLORS.contact, COLORS.portabilite];

export function DashboardCharts({ contacts, portability }: DashboardChartsProps) {
  const contactMap = groupByMonth(contacts);
  const portabilityMap = groupByMonth(portability);
  const mergedData = mergeMonthData(contactMap, portabilityMap);

  // Area chart: portability only over time
  const areaData = Object.keys(portabilityMap)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .map((month) => ({ month, total: portabilityMap[month] }));

  // Donut chart data
  const donutData = [
    { name: "Contact", value: contacts.length },
    { name: "Portabilité", value: portability.length },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Area Chart — Portability over time */}
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-foreground">
            Formulaires de portabilité — évolution dans le temps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={areaData} margin={{ top: 4, right: 16, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="portabiliteGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.portabilite} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={COLORS.portabilite} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: 12,
                }}
                labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
              />
              <Area
                type="monotone"
                dataKey="total"
                name="Portabilité"
                stroke={COLORS.portabilite}
                strokeWidth={2}
                fill="url(#portabiliteGradient)"
                dot={{ r: 3, fill: COLORS.portabilite }}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart — Monthly comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-foreground">
            Comparaison mensuelle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mergedData} margin={{ top: 4, right: 16, left: -20, bottom: 0 }} barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: 12,
                }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
              />
              <Bar dataKey="contact" name="Contact" fill={COLORS.contact} radius={[4, 4, 0, 0]} />
              <Bar dataKey="portabilite" name="Portabilité" fill={COLORS.portabilite} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Donut Chart — Proportion */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-foreground">
            Répartition des formulaires
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {donutData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={DONUT_COLORS[index]}
                    stroke="transparent"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: 12,
                }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}