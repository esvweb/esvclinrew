import StarRating from './StarRating'

type Props = {
  average: number
  count: number
}

export default function AggregateRating({ average, count }: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-brand-cream border border-green-100 rounded-2xl px-8 py-6 shadow-sm">
      <div className="text-center sm:text-left">
        <div className="font-display text-6xl font-bold text-brand-green leading-none">
          {average.toFixed(1)}
        </div>
        <div className="text-gray-500 text-sm mt-1">out of 5</div>
      </div>
      <div className="flex flex-col items-center sm:items-start gap-2">
        <StarRating rating={Math.round(average)} size="lg" />
        <p className="text-gray-600 text-sm">
          Based on <span className="font-semibold text-brand-green">{count}</span> verified reviews
        </p>
      </div>
    </div>
  )
}
